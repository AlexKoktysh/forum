import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
    reducers: {
        setDefaultUser(state, action: PayloadAction<TUser>) {
            state.usersList = [...state.usersList, action.payload];
        },
        changingUser(state, action: PayloadAction<TUser>) {
            state.usersList = state.usersList.map((user) => (user.id === action.payload.id ? action.payload : user));
        },
    },
    extraReducers(builder) {
        builder.addMatcher(usersApi.endpoints.getAllUsers.matchFulfilled, (state, { payload }) => {
            const defaultUser = state.usersList.find(({ id }) => id === 11) as TUser;
            state.usersList = [defaultUser, ...payload];
        });
    },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
