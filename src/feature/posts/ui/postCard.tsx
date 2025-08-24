import { type FC } from "react";
import { Typography, Card, Tag } from "antd";
import type { TPost } from "../../../entity/posts/model";
import { CommentButton } from "../../comments";
import { AuthorInfo, DeleteButton, FavoriteButton, LikeButton } from "../../../feature";

import styles from "./styles.module.scss";

const { Paragraph } = Typography;

interface PostCardProps {
    post: TPost;
    onPostClick?: (postId: number) => void;
    onUserClick?: (userId: number) => void;
}

export const PostCard: FC<PostCardProps> = ({ post, onPostClick, onUserClick }) => {
    const handlePostClick = () => {
        onPostClick?.(post.id);
    };

    return (
        <Card
            className={styles.postCard}
            hoverable
            onClick={handlePostClick}
            actions={[
                <LikeButton postId={post.id} />,
                <LikeButton postId={post.id} isDislikeButton={true} />,
                <CommentButton postId={post.id} post={post} />,
                <FavoriteButton post={post} />,
                <DeleteButton postId={post.id} />,
            ]}
        >
            <AuthorInfo
                post={post}
                variant="card"
                onUserClick={onUserClick}
                showPostId={true}
                className={styles.postHeader}
            />

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
