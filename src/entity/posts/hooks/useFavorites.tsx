import { message } from "antd";
import { useActions, useAppSelector } from "../../../shared";
import type { TPost } from "../model";

export const useFavorites = () => {
    const { addPostToFavorite } = useActions();
    const favoritesPosts = useAppSelector((state) => state.posts.favoritesPosts);

    const toggleFavorite = (post: TPost) => {
        const isAlreadyFavorite = favoritesPosts.some((favPost) => favPost.id === post.id);

        addPostToFavorite(post);

        if (isAlreadyFavorite) {
            message.success("Пост удален из избранного");
        } else {
            message.success("Пост добавлен в избранное");
        }
    };

    const isPostInFavorites = (postId: number): boolean => {
        return favoritesPosts.some((favPost) => favPost.id === postId);
    };

    return {
        favoritesPosts,
        toggleFavorite,
        isPostInFavorites,
    };
};
