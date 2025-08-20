import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import { baseInstance } from "../../api";

export const actions = {};

export const rootReducer = combineReducers({
    [baseInstance.reducerPath]: baseInstance.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).concat([baseInstance.middleware]),
    });
};
