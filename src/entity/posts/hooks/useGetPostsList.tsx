import { useEffect } from "react";
import { postsApi } from "../api";
import { useAppSelector } from "../../../shared";
import { message } from "antd";

export const useGetPostsList = () => {
    const postsList = useAppSelector((state) => state.posts.postsList);

    const [getAllPosts, { isFetching, isError }] = postsApi.useLazyGetAllPostsQuery();

    useEffect(() => {
        getAllPosts(null);
    }, [getAllPosts]);
    useEffect(() => {
        isError && message.error("Ошибка при получении списка постов");
    }, [isError]);

    return { isFetching, postsList };
};
