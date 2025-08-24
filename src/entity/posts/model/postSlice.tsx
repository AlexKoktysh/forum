import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { postsApi } from "../api";
import type { TPost } from "./types";

const initialState: {
    postsList: TPost[];
    deletingPostId: number | null;
    favoritesPosts: TPost[];
} = {
    postsList: [],
    favoritesPosts: [],
    deletingPostId: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        resetDeletingPostId(state) {
            state.deletingPostId = null;
        },
        addPostToFavorite(state, action: PayloadAction<TPost>) {
            const post = action.payload;
            const isAlreadyFavorite = state.favoritesPosts.some((favPost) => favPost.id === post.id);

            if (isAlreadyFavorite) {
                state.favoritesPosts = state.favoritesPosts.filter((favPost) => favPost.id !== post.id);
            } else {
                state.favoritesPosts = [...state.favoritesPosts, post];
            }
        },
    },
    extraReducers(builder) {
        builder.addMatcher(postsApi.endpoints.getAllPosts.matchFulfilled, (state, { payload }) => {
            state.postsList = payload;
        });
        builder.addMatcher(
            postsApi.endpoints.deletePost.matchPending,
            (
                state,
                {
                    meta: {
                        arg: {
                            originalArgs: { postId },
                        },
                    },
                },
            ) => {
                state.deletingPostId = postId;
            },
        );
        builder.addMatcher(
            postsApi.endpoints.deletePost.matchFulfilled,
            (
                state,
                {
                    meta: {
                        arg: {
                            originalArgs: { postId },
                        },
                    },
                },
            ) => {
                state.postsList = state.postsList.filter(({ id }) => postId !== id);
            },
        );
    },
});

export const postsActions = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
