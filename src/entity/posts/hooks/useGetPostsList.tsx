import { useEffect } from "react";
import { postsApi } from "../api";
import { useAppSelector } from "../../../shared";
import { message } from "antd";

type IProps = {
    isFavorite: boolean;
};

export const useGetPostsList = ({ isFavorite }: IProps) => {
    const postsList = useAppSelector((state) => state.posts.postsList);
    const favoriteList = useAppSelector((state) => state.posts.favoritesPosts);

    const { isFetching, isError } = postsApi.useGetAllPostsQuery(null);

    useEffect(() => {
        isError && message.error("Ошибка при получении списка постов");
    }, [isError]);

    return { isFetching, postsList: isFavorite ? favoriteList : postsList };
};
