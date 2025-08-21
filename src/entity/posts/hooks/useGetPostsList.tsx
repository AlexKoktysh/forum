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

    const apiQuery = useMemo(() => {
        return filterUserId ? { userId: filterUserId } : null;
    }, [filterUserId]);

    const basePostsList = useMemo(() => {
        return isFavorite ? favoriteList : postsList;
    }, [isFavorite, favoriteList, postsList]);

    const filteredPostsList = useMemo(() => {
        if (isFavorite) {
            return basePostsList.filter((post) => post.userId === filterUserId);
        }
        return basePostsList;
    }, [basePostsList, filterUserId, isFavorite]);

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
