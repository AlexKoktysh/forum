import { type FC } from "react";
import { Typography, Card, Tag, Avatar } from "antd";
import { UserOutlined, MessageOutlined } from "@ant-design/icons";
import { useGetUsersList } from "../../../entity";
import type { TPost } from "../../../entity/posts/model";
import { LikeButton } from "../../like";
import { FavoriteButton } from "../../favorite";
import { DeleteButton } from "../../delete";

import styles from "./styles.module.scss";

const { Title, Paragraph } = Typography;

interface PostCardProps {
    post: TPost;
    onPostClick?: (postId: number) => void;
    onUserClick?: (userId: number) => void;
    onComment?: (postId: number) => void;
}

export const PostCard: FC<PostCardProps> = ({ post, onPostClick, onUserClick, onComment }) => {
    const { usersList } = useGetUsersList();

    const handlePostClick = () => {
        onPostClick?.(post.id);
    };

    const handleUserClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onUserClick?.(post.userId);
    };

    const handleCommentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onComment?.(post.id);
    };

    return (
        <Card
            className={styles.postCard}
            hoverable
            onClick={handlePostClick}
            actions={[
                <LikeButton postId={post.id} />,
                <LikeButton postId={post.id} isDislikeButton={true} />,
                <div key="comments" className={styles.actionItem} data-action="comment" onClick={handleCommentClick}>
                    <MessageOutlined />
                    <span>Комментарии</span>
                </div>,
                <FavoriteButton post={post} />,
                <DeleteButton postId={post.id} />,
            ]}
        >
            <div className={styles.postHeader}>
                <Avatar
                    size="large"
                    className={styles.userAvatar}
                    icon={<UserOutlined />}
                    onClick={(e) => handleUserClick(e as React.MouseEvent)}
                />
                <div className={styles.postMeta}>
                    <Title level={4} className={styles.postTitle}>
                        {post.title}
                    </Title>
                    <div className={styles.postInfo}>
                        <span className={styles.postId}>#{post.id}</span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.userId} onClick={handleUserClick}>
                            {usersList?.find(({ id }) => id === post.userId)?.username ?? post.userId}
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
