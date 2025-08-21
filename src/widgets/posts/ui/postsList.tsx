import { type FC } from "react";
import { useDeletePost, useGetPostsList, useFavorites } from "../../../entity";
import type { TPost } from "../../../entity/posts/model";
import { Counter, Empty, PostCard, PostsSkeleton, UserFilter } from "../../../feature";

import styles from "./styles.module.scss";

type IProps = {
    isFavorite?: boolean;
};

export const PostsList: FC<IProps> = ({ isFavorite = false }) => {
    const { isFetching, postsList, filterUserId, setFilterUserId } = useGetPostsList({ isFavorite });
    const { deletePostHandler, deletingPostId } = useDeletePost();
    const { toggleFavorite, isPostInFavorites } = useFavorites();

    const handleDeletePost = async (postId: number) => {
        deletePostHandler(postId);
    };

    const handleFavoriteToggle = (post: TPost) => {
        toggleFavorite(post);
    };

    const handleUserFilterChange = (userId: number | null) => {
        setFilterUserId(userId);
    };

    if (isFetching) {
        return <PostsSkeleton count={3} />;
    }

    return (
        <div className={styles.postsContainer}>
            <Counter
                count={postsList?.length}
                entityName="постов"
                header={!isFavorite ? "Все посты" : "Избранные посты"}
            />

            <UserFilter selectedUserId={filterUserId} onUserChange={handleUserFilterChange} />

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
                                onUserClick={(userId) => setFilterUserId(userId)}
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
