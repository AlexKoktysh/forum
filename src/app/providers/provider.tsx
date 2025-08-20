import type { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../../shared";
import { AuthProvider } from "./authProvider";
import { RoleProvider } from "./roleProvider";

interface IProviders {
    readonly children: ReactElement;
}

const store = setupStore();

export const AppProvider: FC<IProviders> = ({ children }) => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <RoleProvider>{children}</RoleProvider>
            </AuthProvider>
        </Provider>
    );
};
