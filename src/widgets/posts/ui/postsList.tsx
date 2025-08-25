import { type FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useDeletePost, useGetPostsList } from "../../../entity";
import type { TPost } from "../../../entity/posts/model";
import { Counter, Empty, PostsSkeleton, UserFilter } from "../../../feature";
import { useAppSelector, DragAndDropWrapper, useActions } from "../../../shared";
import { SortablePostCard } from "./sortablePostCard";

import styles from "./styles.module.scss";

type IProps = {
    isFavorite?: boolean;
};

export const PostsList: FC<IProps> = ({ isFavorite = false }) => {
    const navigate = useNavigate();
    const { updatePostsOrder, resetPostsOrder } = useActions();

    const { isFetching, postsList, filterUserId, setFilterUserId } = useGetPostsList({ isFavorite });
    const { deletingPostId } = useDeletePost();
    const customOrder = useAppSelector((state: any) => state.posts.customOrder);

    const handlePostClick = useCallback(
        (postId: number) => {
            navigate(`/posts/${postId}`);
        },
        [navigate],
    );

    const handleUserFilterChange = useCallback(
        (userId: number | null) => {
            setFilterUserId(userId);
        },
        [setFilterUserId],
    );

    const handlePostsReorder = useCallback(
        (newPosts: TPost[]) => {
            const newCustomOrder = newPosts.map((post) => post.id);
            updatePostsOrder(newCustomOrder);
        },
        [updatePostsOrder],
    );

    const handleResetOrder = useCallback(() => {
        resetPostsOrder();
    }, [resetPostsOrder]);

    // Мемоизируем функцию для получения ID поста
    const getPostId = useCallback((post: TPost) => post.id, []);

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

            <div className={styles.controlsContainer}>
                <UserFilter selectedUserId={filterUserId} onUserChange={handleUserFilterChange} />

                {!isFavorite && customOrder.length > 0 && (
                    <Button type="default" icon={<ReloadOutlined />} onClick={handleResetOrder} size="small">
                        Сбросить порядок
                    </Button>
                )}
            </div>

            <DragAndDropWrapper
                items={postsList || []}
                getItemId={getPostId}
                onItemsReorder={handlePostsReorder}
                className={styles.postsList}
                sortable={!isFavorite} // Сортировка только для обычных постов
            >
                {postsList?.map((post: TPost) => {
                    const isCurrentPostDeleting = deletingPostId === post.id;

                    return (
                        <SortablePostCard
                            key={post.id}
                            post={post}
                            isDeleting={isCurrentPostDeleting}
                            onPostClick={handlePostClick}
                            onUserClick={(userId: number) => setFilterUserId(userId)}
                            sortable={!isFavorite} // Передаем флаг сортировки
                        />
                    );
                })}

                {!postsList?.length && (
                    <Empty
                        description={
                            !isFavorite
                                ? "Здесь будут отображаться все посты от пользователей"
                                : "Здесь будут отображаться избранные посты"
                        }
                        title={!isFavorite ? "Пока нет постов" : "Пока нет избранных постов"}
                    />
                )}
            </DragAndDropWrapper>
        </div>
    );
};
