import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import { baseInstance } from "../../api";
import { authActions, authReducer, postsActions, postsReducer, usersActions, usersReducer } from "../../../entity";

export const actions = {
    ...authActions,
    ...postsActions,
    ...usersActions,
};

export const rootReducer = combineReducers({
    [baseInstance.reducerPath]: baseInstance.reducer,
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).concat([baseInstance.middleware]),
    });
};
