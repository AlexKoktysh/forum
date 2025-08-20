import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";
import type { TAuthDto } from "../types";

const initialState: {
    data: TAuthDto | null;
} = {
    data: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser(state, action: PayloadAction<TAuthDto | null>) {
            state.data = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
