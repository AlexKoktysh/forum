import { RouterProvider } from "react-router-dom";
import { routerPaths } from "../utils";

export const Router = () => {
    return <RouterProvider router={routerPaths} />;
};
