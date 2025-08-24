import { message } from "antd";
import { postsApi } from "../api";
import type { TPost } from "../model";
import { useEffect, useState } from "react";

export const useCreatePost = () => {
    const [isNeedCloseModal, setIsNeedCloseModal] = useState(false);
    const [createPost, { isLoading, isError, isSuccess }] = postsApi.useCreatePostMutation();

    const createPostHandler = (newPost: Omit<TPost, "id">) => {
        createPost(newPost);
    };

    useEffect(() => {
        if (isError) {
            message.error("Ошибка при создании поста");
            setIsNeedCloseModal(true);
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            message.success("Пост успешно создан");
            setIsNeedCloseModal(true);
        }
    }, [isSuccess]);

    return { createPostHandler, isLoading, isNeedCloseModal };
};
