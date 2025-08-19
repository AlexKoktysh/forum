import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PublicRouter = () => {
    const location = useLocation();
    const isAuth = true;

    return !isAuth ? <Outlet /> : <Navigate to={location.state?.from ?? "/"} replace />;
};
