import { type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, Button, Divider, Skeleton, Alert } from "antd";
import { postsApi } from "../../../entity/posts/api/postsApi";
import { CommentsList, FavoriteButton, LikeButton } from "../../../feature";
import { AuthorInfo } from "../../../feature";

import styles from "./styles.module.scss";

const { Paragraph } = Typography;

export const PostDetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const postId = Number(id);

    const { data: post, isLoading, error } = postsApi.useGetPostByIdQuery({ postId });

    const handleBack = () => {
        navigate(-1);
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
                <AuthorInfo
                    post={post}
                    variant="detail"
                    titleLevel={1}
                    avatarSize={64}
                    className={styles.authorSection}
                />

                <Divider />

                <div className={styles.postContent}>
                    <Paragraph className={styles.postBody}>{post.body}</Paragraph>
                </div>

                <Divider />

                <div className={styles.postFooter}>
                    <div className={styles.actions}>
                        <LikeButton postId={postId} />
                        <LikeButton postId={postId} isDislikeButton={true} />
                        <FavoriteButton post={post} />
                    </div>
                </div>
            </Card>

            <CommentsList postId={postId} />
        </div>
    );
};
