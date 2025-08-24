import { type FC } from "react";
import { Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetUsersList, type TPost } from "../../../entity";

import styles from "./styles.module.scss";

const { Title, Text } = Typography;

type PostAuthorInfoVariant = "card" | "detail" | "modal";

interface PostAuthorInfoProps {
    post: TPost;
    variant?: PostAuthorInfoVariant;
    onUserClick?: (userId: number) => void;
    showPostId?: boolean;
    showTitle?: boolean;
    titleLevel?: 1 | 2 | 3 | 4 | 5;
    avatarSize?: "small" | "default" | "large" | number;
    className?: string;
}

export const AuthorInfo: FC<PostAuthorInfoProps> = ({
    post,
    variant = "card",
    onUserClick,
    showPostId = false,
    showTitle = true,
    titleLevel = 4,
    avatarSize = "large",
    className = "",
}) => {
    const { usersList } = useGetUsersList();

    const user = usersList?.find((u) => u.id === post.userId);
    const username = user?.username || `Пользователь ${post.userId}`;

    const handleUserClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onUserClick?.(post.userId);
    };

    const getContainerClassName = () => {
        const baseClass = styles.postAuthorInfo;
        const variantClass = styles[`${variant}Variant`];
        return `${baseClass} ${variantClass} ${className}`;
    };

    const getAvatarClassName = () => {
        return `${styles.userAvatar} ${styles[`${variant}Avatar`]}`;
    };

    const getTitleClassName = () => {
        return `${styles.postTitle} ${styles[`${variant}Title`]}`;
    };

    const getUserInfoClassName = () => {
        return `${styles.userInfo} ${styles[`${variant}UserInfo`]}`;
    };

    return (
        <div className={getContainerClassName()}>
            <Avatar
                size={avatarSize}
                className={getAvatarClassName()}
                icon={<UserOutlined />}
                // onClick={onUserClick ? handleUserClick : undefined}
                style={{ cursor: onUserClick ? "pointer" : "default" }}
            />
            <div className={styles.postMeta}>
                {showTitle && (
                    <Title level={titleLevel} className={getTitleClassName()}>
                        {post.title}
                    </Title>
                )}
                <div className={getUserInfoClassName()}>
                    {showPostId && (
                        <>
                            <span className={styles.postId}>#{post.id}</span>
                            <span className={styles.separator}>•</span>
                        </>
                    )}
                    <span
                        className={styles.userId}
                        onClick={onUserClick ? handleUserClick : undefined}
                        style={{ cursor: onUserClick ? "pointer" : "default" }}
                    >
                        {variant === "modal" ? `Автор: ${username}` : username}
                    </span>
                    {variant === "detail" && (
                        <Text type="secondary" className={styles.authorRole}>
                            Автор поста
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
};
