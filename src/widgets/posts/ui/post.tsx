import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Divider, Skeleton, Typography } from "antd";
import { useGetPost } from "../../../entity";
import { AuthorInfo, CommentsList, FavoriteButton, LikeButton } from "../../../feature";

import styles from "./postStyles.module.scss";

const { Paragraph } = Typography;

export const PostDetails: FC = () => {
    const navigate = useNavigate();
    const { isLoading, post: activePost } = useGetPost();

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

    if (!activePost) {
        return (
            <div className={styles.container}>
                <Alert
                    message="Ошибка загрузки"
                    description="Пост не найден или произошла ошибка при загрузке"
                    type="error"
                    showIcon
                    action={
                        <Button size="small" onClick={() => navigate(-1)}>
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
                    post={activePost}
                    variant="detail"
                    titleLevel={1}
                    avatarSize={64}
                    className={styles.authorSection}
                />

                <Divider />

                <div className={styles.postContent}>
                    <Paragraph className={styles.postBody}>{activePost.body}</Paragraph>
                </div>

                <Divider />

                <div className={styles.postFooter}>
                    <div className={styles.actions}>
                        <LikeButton postId={activePost.id} />
                        <LikeButton postId={activePost.id} isDislikeButton={true} />
                        <FavoriteButton post={activePost} />
                    </div>
                </div>
            </Card>

            <CommentsList postId={activePost.id} />
        </div>
    );
};
