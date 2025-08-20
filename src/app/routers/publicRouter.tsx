import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PublicLayout } from "../layouts/publicLayout";
import { useContext } from "react";
import { AuthContext } from "../../shared";

export const PublicRouter = () => {
    const location = useLocation();
    const { isAuth } = useContext(AuthContext);

    return !isAuth ? (
        <PublicLayout>
            <Outlet />
        </PublicLayout>
    ) : (
        <Navigate to={location.state?.from ?? "/"} replace />
    );
};
