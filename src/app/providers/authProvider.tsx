import { useMemo, useState, type FC, type ReactElement } from "react";
import { AuthContext, useActions, type IContext } from "../../shared";
import type { TAuthDto } from "src/entity";

interface IProvider {
    children: ReactElement;
}

export const AuthProvider: FC<IProvider> = ({ children }) => {
    const { setAuthUser } = useActions();

    const [isAuth, setIsAuth] = useState(false);

    const value: IContext = useMemo(
        () => ({
            isAuth,
            signInHandler: (values: TAuthDto) => {
                setIsAuth(true);
                setAuthUser(values);
            },
            signOutHandler: () => setIsAuth(false),
        }),
        [isAuth],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
