import { type FC } from "react";
import { Typography, Card, Tag, Avatar } from "antd";
import { UserOutlined, CalendarOutlined, MessageOutlined } from "@ant-design/icons";
import type { TPost } from "../../../entity/posts/model";

import styles from "./styles.module.scss";

const { Title, Paragraph } = Typography;

interface PostCardProps {
    post: TPost;
    onDiscuss?: (postId: number) => void;
    onUserClick?: (userId: number) => void;
}

export const PostCard: FC<PostCardProps> = ({ post, onDiscuss, onUserClick }) => {
    const handleDiscussClick = () => {
        onDiscuss?.(post.id);
    };

    const handleUserClick = () => {
        onUserClick?.(post.userId);
    };

    return (
        <Card
            className={styles.postCard}
            hoverable
            actions={[
                <div key="user" className={styles.actionItem} onClick={handleUserClick}>
                    <UserOutlined />
                    <span>ID: {post.userId}</span>
                </div>,
                <div key="comments" className={styles.actionItem} onClick={handleDiscussClick}>
                    <MessageOutlined />
                    <span>Обсудить</span>
                </div>,
                <div key="date" className={styles.actionItem}>
                    <CalendarOutlined />
                    <span>Сегодня</span>
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
