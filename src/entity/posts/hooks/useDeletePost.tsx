import { useEffect } from "react";
import { message } from "antd";
import { postsApi } from "../api";
import { useActions, useAppSelector } from "../../../shared";

export const useDeletePost = () => {
    const { resetDeletingPostId } = useActions();
    const deletingPostId = useAppSelector((state) => state.posts.deletingPostId);

    const [deletePost, { isSuccess: isSuccessDeletePost, isError }] = postsApi.useDeletePostMutation();

    const deletePostHandler = (id: number) => {
        deletePost({ postId: id });
    };

    useEffect(() => {
        isSuccessDeletePost && message.success("Пост успешно удален");
    }, [isSuccessDeletePost]);
    useEffect(() => {
        isError && message.error("Ошибка при удалении поста");
    }, [isError]);

    useEffect(() => {
        deletingPostId &&
            setTimeout(() => {
                resetDeletingPostId();
            }, 500);
    }, [deletingPostId]);

    return { deletePostHandler, deletingPostId };
};
