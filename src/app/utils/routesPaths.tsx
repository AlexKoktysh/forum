import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage, LoginPage, ProfilePage, PostsPage, PostDetailPage, UsersPage, FavoritePage } from "../../pages";
import { PrivateRouter, PublicRouter } from "../routers";

export const routerPaths = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRouter />,
        children: [
            {
                path: "/",
                element: <ProfilePage />,
            },
            { path: "/posts", element: <PostsPage /> },
            { path: "/posts/:id", element: <PostDetailPage /> },
            {
                path: "/users",
                element: <UsersPage />,
            },
            {
                path: "/favorite",
                element: <FavoritePage />,
            },
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
