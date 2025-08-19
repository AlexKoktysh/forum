import { Navigate, Outlet } from "react-router-dom";

export const PrivateRouter = () => {
    const isAuth = true;

    return isAuth ? <Outlet /> : <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
};
