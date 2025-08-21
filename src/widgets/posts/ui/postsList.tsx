import { type FC } from "react";
import { useDeletePost, useGetPostsList, useFavorites } from "../../../entity";
import type { TPost } from "../../../entity/posts/model";
import { Counter, Empty, PostCard, PostsSkeleton } from "../../../feature";

import styles from "./styles.module.scss";

export const PostsList: FC = () => {
    const { isFetching, postsList } = useGetPostsList();
    const { deletePostHandler, deletingPostId } = useDeletePost();
    const { toggleFavorite, isPostInFavorites } = useFavorites();

    const handleDeletePost = async (postId: number) => {
        deletePostHandler(postId);
    };

    const handleFavoriteToggle = (post: TPost) => {
        toggleFavorite(post);
    };

    if (isFetching) {
        return <PostsSkeleton count={3} />;
    }

    return (
        <div className={styles.postsContainer}>
            <Counter count={postsList?.length} entityName="постов" header="Все посты" />

            <div className={styles.postsList}>
                {postsList?.map((post: TPost) => {
                    const isCurrentPostDeleting = deletingPostId === post.id;
                    const isFavorite = isPostInFavorites(post.id);

                    return (
                        <div
                            key={post.id}
                            className={`${styles.postWrapper} ${isCurrentPostDeleting ? styles.fadingOut : ""} ${
                                isCurrentPostDeleting ? styles.deleting : ""
                            }`}
                        >
                            <PostCard
                                post={post}
                                onUserClick={(userId) => console.log("Клик по пользователю:", userId)}
                                onLike={(postId) => console.log("Лайк поста:", postId)}
                                onDislike={(postId) => console.log("Дизлайк поста:", postId)}
                                onComment={(postId) => console.log("Комментарии к посту:", postId)}
                                onFavorite={handleFavoriteToggle}
                                onDelete={handleDeletePost}
                                isDeleting={isCurrentPostDeleting}
                                isFavorite={isFavorite}
                            />
                        </div>
                    );
                })}

                {!postsList?.length && (
                    <Empty description="Здесь будут отображаться все посты от пользователей" title="Пока нет постов" />
                )}
            </div>
        </div>
    );
};
