import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "./types";
import { usersApi } from "../api";

const initialState: {
    usersList: TUser[];
} = {
    usersList: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(usersApi.endpoints.getAllUsers.matchFulfilled, (state, { payload }) => {
            state.usersList = payload;
        });
    },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
