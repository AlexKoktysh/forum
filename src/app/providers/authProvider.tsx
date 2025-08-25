import { useMemo, useState, type FC, type ReactElement } from "react";
import { AuthContext, useActions, type IContext } from "../../shared";
import type { TAuthDto } from "src/entity";

interface IProvider {
    children: ReactElement;
}

const mockedUserId = 11;

export const AuthProvider: FC<IProvider> = ({ children }) => {
    const { setAuthUser, setDefaultUser } = useActions();

    const [isAuth, setIsAuth] = useState(false);

    const value: IContext = useMemo(
        () => ({
            isAuth,
            signInHandler: (values: TAuthDto) => {
                setDefaultUser({ id: mockedUserId, username: values.email });
                setIsAuth(true);
                setAuthUser({ ...values, id: mockedUserId });
            },
            signOutHandler: () => setIsAuth(false),
        }),
        [isAuth],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
