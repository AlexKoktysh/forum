import { type FC } from "react";
import { Typography, Card, Tag, Avatar } from "antd";
import {
    UserOutlined,
    MessageOutlined,
    HeartOutlined,
    DislikeOutlined,
    DeleteOutlined,
    StarOutlined,
    StarFilled,
    LoadingOutlined,
} from "@ant-design/icons";
import type { TPost } from "../../../entity/posts/model";

import styles from "./styles.module.scss";

const { Title, Paragraph } = Typography;

interface PostCardProps {
    post: TPost;
    onUserClick?: (userId: number) => void;
    onLike?: (postId: number) => void;
    onDislike?: (postId: number) => void;
    onComment?: (postId: number) => void;
    onDelete?: (postId: number) => void;
    onFavorite?: (post: TPost) => void;
    isDeleting?: boolean;
    isFavorite?: boolean;
}

export const PostCard: FC<PostCardProps> = ({
    post,
    onUserClick,
    onLike,
    onDislike,
    onComment,
    onDelete,
    onFavorite,
    isDeleting = false,
    isFavorite = false,
}) => {
    const handleUserClick = () => {
        onUserClick?.(post.userId);
    };

    const handleLikeClick = () => {
        onLike?.(post.id);
    };

    const handleDislikeClick = () => {
        onDislike?.(post.id);
    };

    const handleCommentClick = () => {
        onComment?.(post.id);
    };

    const handleDeleteClick = () => {
        onDelete?.(post.id);
    };

    const handleFavoriteClick = () => {
        onFavorite?.(post);
    };

    return (
        <Card
            className={styles.postCard}
            hoverable
            actions={[
                <div key="like" className={styles.actionItem} data-action="like" onClick={handleLikeClick}>
                    <HeartOutlined />
                    <span>Лайк</span>
                </div>,
                <div key="dislike" className={styles.actionItem} data-action="dislike" onClick={handleDislikeClick}>
                    <DislikeOutlined />
                    <span>Дизлайк</span>
                </div>,
                <div key="comments" className={styles.actionItem} data-action="comment" onClick={handleCommentClick}>
                    <MessageOutlined />
                    <span>Комментарии</span>
                </div>,
                <div
                    key="favorite"
                    className={`${styles.actionItem} ${isFavorite ? styles.favoriteActive : ""}`}
                    data-action="favorite"
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? <StarFilled /> : <StarOutlined />}
                    <span>{isFavorite ? "В избранном" : "В избранное"}</span>
                </div>,
                <div
                    key="delete"
                    className={styles.actionItem}
                    data-action="delete"
                    onClick={isDeleting ? undefined : handleDeleteClick}
                >
                    {isDeleting ? <LoadingOutlined spin /> : <DeleteOutlined />}
                    <span>{isDeleting ? "Удаление..." : "Удалить"}</span>
                </div>,
            ]}
        >
            <div className={styles.postHeader}>
                <Avatar size="large" className={styles.userAvatar} icon={<UserOutlined />} onClick={handleUserClick} />
                <div className={styles.postMeta}>
                    <Title level={4} className={styles.postTitle}>
                        {post.title}
                    </Title>
                    <div className={styles.postInfo}>
                        <span className={styles.postId}>#{post.id}</span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.userId} onClick={handleUserClick}>
                            Пользователь {post.userId}
                        </span>
                    </div>
                </div>
            </div>

            <Paragraph className={styles.postBody} ellipsis={{ rows: 3, expandable: true, symbol: "читать далее" }}>
                {post.body}
            </Paragraph>

            <div className={styles.postFooter}>
                <div className={styles.tags}>
                    <Tag color="purple">Пост</Tag>
                    <Tag color="green">Новое</Tag>
                </div>
            </div>
        </Card>
    );
};
