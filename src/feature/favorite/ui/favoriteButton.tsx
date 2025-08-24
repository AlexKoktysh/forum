import { Button } from "antd";
import { useMemo, type FC } from "react";
import { useFavorites, type TPost } from "../../../entity";
import { StarFilled, StarOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";

interface IProps {
    post: TPost;
}

export const FavoriteButton: FC<IProps> = ({ post }) => {
    const { toggleFavorite, isPostInFavorites } = useFavorites();

    const icon = useMemo(() => {
        return isPostInFavorites(post.id) ? <StarFilled /> : <StarOutlined />;
    }, [post.id, isPostInFavorites(post.id)]);

    return (
        <Button
            type="text"
            size="middle"
            icon={icon}
            onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(post);
            }}
            className={`${styles.favoriteButton} ${isPostInFavorites(post.id) ? styles.favorite : ""}`}
        />
    );
};
