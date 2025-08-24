import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDeletePost, useGetPostsList } from "../../../entity";
import type { TPost } from "../../../entity/posts/model";
import { Counter, Empty, PostCard, PostsSkeleton, UserFilter } from "../../../feature";

import styles from "./styles.module.scss";

type IProps = {
    isFavorite?: boolean;
};

export const PostsList: FC<IProps> = ({ isFavorite = false }) => {
    const navigate = useNavigate();
    const { isFetching, postsList, filterUserId, setFilterUserId } = useGetPostsList({ isFavorite });
    const { deletingPostId } = useDeletePost();

    const handlePostClick = (postId: number) => {
        navigate(`/posts/${postId}`);
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

                    return (
                        <div
                            key={post.id}
                            className={`${styles.postWrapper} ${isCurrentPostDeleting ? styles.fadingOut : ""} ${
                                isCurrentPostDeleting ? styles.deleting : ""
                            }`}
                        >
                            <PostCard
                                post={post}
                                onPostClick={handlePostClick}
                                onUserClick={(userId) => setFilterUserId(userId)}
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
