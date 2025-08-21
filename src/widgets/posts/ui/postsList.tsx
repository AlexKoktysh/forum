import { useEffect, type FC } from "react";
import { Typography, Tag } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { postsApi } from "../../../entity";
import type { TPost } from "../../../entity/posts/model";
import { PostCard, PostsSkeleton } from "../../../feature";

import styles from "./styles.module.scss";

const { Title, Paragraph } = Typography;

export const PostsList: FC = () => {
    const [getAllPosts, { data: postsList, isFetching }] = postsApi.useLazyGetAllPostsQuery();

    useEffect(() => {
        getAllPosts(null);
    }, [getAllPosts]);

    if (isFetching) {
        return <PostsSkeleton count={3} />;
    }

    return (
        <div className={styles.postsContainer}>
            <div className={styles.header}>
                <Title level={2} className={styles.title}>
                    Все посты
                </Title>
                <Tag color="white" className={styles.counter}>
                    {postsList?.length || 0} постов
                </Tag>
            </div>

            <div className={styles.postsList}>
                {postsList?.map((post: TPost) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onDiscuss={(postId) => console.log("Обсуждение поста:", postId)}
                        onUserClick={(userId) => console.log("Клик по пользователю:", userId)}
                    />
                ))}

                {!postsList?.length ? (
                    <div className={styles.emptyState}>
                        <MessageOutlined className={styles.emptyIcon} />
                        <Title level={3} className={styles.emptyTitle}>
                            Пока нет постов
                        </Title>
                        <Paragraph className={styles.emptyDescription}>
                            Здесь будут отображаться все посты от пользователей
                        </Paragraph>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
