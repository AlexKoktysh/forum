import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import { baseInstance } from "../../api";
import { authActions, authReducer } from "../../../entity";

export const actions = {
    ...authActions,
};

export const rootReducer = combineReducers({
    [baseInstance.reducerPath]: baseInstance.reducer,
    auth: authReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).concat([baseInstance.middleware]),
    });
};
