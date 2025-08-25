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
        const filtered = isFavorite
            ? basePostsList.filter((post) => !filterUserId || post.userId === filterUserId)
            : basePostsList;

        if (isFavorite || customOrder.length === 0) {
            return filtered;
        }

        const orderMap = new Map(customOrder.map((id, index) => [id, index]));

        return [...filtered].sort((a, b) => {
            const aOrder = orderMap.get(a.id);
            const bOrder = orderMap.get(b.id);

            if (aOrder !== undefined && bOrder !== undefined) {
                return aOrder - bOrder;
            }

            if (aOrder !== undefined) return -1;
            if (bOrder !== undefined) return 1;

            return a.id - b.id;
        });
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
