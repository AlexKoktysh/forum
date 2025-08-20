import { Navigate, Outlet } from "react-router-dom";
import { PrivateLayout } from "../layouts/privateLayout";
import { useContext } from "react";
import { AuthContext } from "../../shared";

export const PrivateRouter = () => {
    const { isAuth } = useContext(AuthContext);

    return isAuth ? (
        <PrivateLayout>
            <Outlet />
        </PrivateLayout>
    ) : (
        <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
    );
};
