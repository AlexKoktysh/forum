import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";
import type { TAuthDto, WithId } from "../types";

const initialState: {
    data: WithId<TAuthDto> | null;
} = {
    data: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser(state, action: PayloadAction<WithId<TAuthDto> | null>) {
            state.data = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
