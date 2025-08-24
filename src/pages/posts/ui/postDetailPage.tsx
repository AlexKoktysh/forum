import { type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, Avatar, Button, Divider, Skeleton, Alert } from "antd";
import { UserOutlined, MessageOutlined } from "@ant-design/icons";
import { postsApi } from "../../../entity/posts/api/postsApi";
import { useGetUsersList } from "../../../entity";
import { CommentButton, FavoriteButton, LikeButton } from "../../../feature";

import styles from "./styles.module.scss";

const { Title, Paragraph, Text } = Typography;

export const PostDetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const postId = Number(id);

    const { data: post, isLoading, error } = postsApi.useGetPostByIdQuery({ postId });
    const { usersList } = useGetUsersList();

    const user = usersList?.find((u) => u.id === post?.userId);

    const handleBack = () => {
        navigate(-1);
    };

    const handleComment = () => {
        console.log("Комментарии к посту:", postId);
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <Skeleton.Button active size="small" />
                    <Skeleton.Input active size="small" />
                </div>
                <Card className={styles.postCard}>
                    <Skeleton active avatar paragraph={{ rows: 6 }} />
                </Card>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className={styles.container}>
                <Alert
                    message="Ошибка загрузки"
                    description="Пост не найден или произошла ошибка при загрузке"
                    type="error"
                    showIcon
                    action={
                        <Button size="small" onClick={handleBack}>
                            Назад
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Card className={styles.postCard}>
                <div className={styles.postHeader}>
                    <Title level={1} className={styles.postTitle}>
                        {post.title}
                    </Title>
                </div>

                <Divider />

                <div className={styles.authorSection}>
                    <Avatar size={64} icon={<UserOutlined />} className={styles.authorAvatar} />
                    <div className={styles.authorInfo}>
                        <Title level={4} className={styles.authorName}>
                            {user?.username || `Пользователь ${post.userId}`}
                        </Title>
                        <Text type="secondary" className={styles.authorRole}>
                            Автор поста
                        </Text>
                    </div>
                </div>

                <Divider />

                <div className={styles.postContent}>
                    <Paragraph className={styles.postBody}>{post.body}</Paragraph>
                </div>

                <Divider />

                <div className={styles.postFooter}>
                    <div className={styles.actions}>
                        <LikeButton postId={postId} />
                        <LikeButton postId={postId} isDislikeButton={true} />
                        <CommentButton postId={postId} />
                        <FavoriteButton post={post} />
                    </div>
                </div>
            </Card>

            <Card className={styles.commentsCard} title="Комментарии (8)">
                <div className={styles.commentsPlaceholder}>
                    <Text type="secondary">Здесь будет раздел комментариев</Text>
                </div>
            </Card>
        </div>
    );
};
