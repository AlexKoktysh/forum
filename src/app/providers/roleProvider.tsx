import { useMemo, type FC, type ReactElement } from "react";
import { RoleContext, useAppSelector, type IRoleContext } from "../../shared";

interface IProvider {
    children: ReactElement;
}

export const RoleProvider: FC<IProvider> = ({ children }) => {
    const authUser = useAppSelector((state) => state.auth.data);

    const value: IRoleContext = useMemo(
        () => ({
            isAdmin: !!authUser?.isAdmin,
        }),
        [authUser],
    );

    return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
