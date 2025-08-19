import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage, LoginPage, ProfilePage, PostsPage } from "../../pages";
import { PrivateRouter, PublicRouter } from "../routers";

export const routerPaths = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRouter />,
        children: [
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            { path: "/", element: <PostsPage /> },
        ],
    },
    {
        path: "/",
        element: <PublicRouter />,
        children: [
            {
                path: "/sign-in",
                element: <LoginPage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
