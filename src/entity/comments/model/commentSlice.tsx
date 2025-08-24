import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";
import type { TComment, TCommentsState } from "./types";

const initialState: TCommentsState = {
    data: {},
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment(state, action: PayloadAction<TComment>) {
            const comment = action.payload;
            const postId = comment.postId;

            if (!state.data[postId]) {
                state.data[postId] = [];
            }
            state.data[postId] = [...state.data[postId], comment];
        },
    },
});

export const commentActions = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
