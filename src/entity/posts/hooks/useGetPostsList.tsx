import { useEffect, useMemo, useState } from "react";
import { postsApi } from "../api";
import { useAppSelector } from "../../../shared";
import { message } from "antd";

type IProps = {
    isFavorite?: boolean;
};

export const useGetPostsList = ({ isFavorite = false }: IProps = {}) => {
    const [filterUserId, setFilterUserId] = useState<number | null>(null);
    const postsList = useAppSelector((state) => state.posts.postsList);
    const favoriteList = useAppSelector((state) => state.posts.favoritesPosts);
    const customOrder = useAppSelector((state) => state.posts.customOrder);

    const apiQuery = useMemo(() => {
        return filterUserId ? { userId: filterUserId } : null;
    }, [filterUserId]);

    const basePostsList = useMemo(() => {
        return isFavorite ? favoriteList : postsList;
    }, [isFavorite, favoriteList, postsList]);

    const filteredPostsList = useMemo(() => {
        let filtered = isFavorite
            ? basePostsList.filter((post) => !filterUserId || post.userId === filterUserId)
            : basePostsList;

        // Применяем пользовательский порядок сортировки, если он есть
        if (customOrder.length > 0 && !isFavorite) {
            const orderedPosts = [];
            const remainingPosts = [...filtered];

            // Сначала добавляем посты в пользовательском порядке
            for (const postId of customOrder) {
                const postIndex = remainingPosts.findIndex((post) => post.id === postId);
                if (postIndex !== -1) {
                    orderedPosts.push(remainingPosts.splice(postIndex, 1)[0]);
                }
            }

            // Затем добавляем оставшиеся посты (новые, которых не было в порядке)
            orderedPosts.push(...remainingPosts);

            return orderedPosts;
        }

        return filtered;
    }, [basePostsList, filterUserId, isFavorite, customOrder]);

    const { isFetching, isError, refetch } = postsApi.useGetAllPostsQuery(apiQuery);

    useEffect(() => {
        isError && message.error("Ошибка при получении списка постов");
    }, [isError]);
    useEffect(() => {
        refetch();
    }, [filterUserId]);

    return {
        isFetching,
        postsList: filteredPostsList,
        filterUserId,
        setFilterUserId,
    };
};
