import { message } from "antd";
import { postsApi } from "../api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useGetPost = () => {
    const { id } = useParams<{ id: string }>();
    const postId = Number(id);
    const navigate = useNavigate();

    const { data: post, isFetching, isError } = postsApi.useGetPostByIdQuery({ postId });

    useEffect(() => {
        if (isError) {
            message.error("Ошибка при получении поста");
            navigate(-1);
        }
    }, [isError]);

    return { post, isLoading: isFetching };
};
