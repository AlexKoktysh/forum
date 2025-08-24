import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";

const initialState: {
    isLiked: { [postId: number]: boolean };
    isDisliked: { [postId: number]: boolean };
} = {
    isLiked: {},
    isDisliked: {},
};

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        setIsLike(state, action: PayloadAction<{ postId: number; isLiked: boolean }>) {
            const { isLiked, postId } = action.payload;
            state.isLiked = { ...state.isLiked, [postId]: isLiked };
        },
        setIsDislike(state, action: PayloadAction<{ postId: number; isDisliked: boolean }>) {
            const { isDisliked, postId } = action.payload;
            state.isDisliked = { ...state.isDisliked, [postId]: isDisliked };
        },
    },
});

export const likeActions = likeSlice.actions;
export const likeReducer = likeSlice.reducer;
