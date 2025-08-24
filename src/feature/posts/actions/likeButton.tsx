import { useMemo, type FC } from "react";
import { Button } from "antd";
import { HeartOutlined, HeartFilled, DislikeOutlined, DislikeFilled } from "@ant-design/icons";
import { useActions, useAppSelector } from "../../../shared";

import styles from "./likeStyles.module.scss";

interface LikeButtonProps {
    postId: number;
    isDislikeButton?: boolean;
}

export const LikeButton: FC<LikeButtonProps> = ({ postId, isDislikeButton = false }) => {
    const isLiked = useAppSelector((state) => state.likes.isLiked?.[postId] ?? false);
    const isDisliked = useAppSelector((state) => state.likes.isDisliked?.[postId] ?? false);
    const { setIsLike, setIsDislike } = useActions();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        !isDislikeButton ? setIsLike({ isLiked: !isLiked, postId }) : setIsDislike({ isDisliked: !isDisliked, postId });
    };

    const icon = useMemo(() => {
        if (!isDislikeButton) {
            return isLiked ? <HeartFilled className={styles.likedIcon} /> : <HeartOutlined />;
        }
        return isDisliked ? <DislikeFilled className={styles.likedIcon} /> : <DislikeOutlined />;
    }, [isLiked, isDislikeButton, isDisliked]);

    return (
        <Button
            type="text"
            size="middle"
            icon={icon}
            onClick={handleClick}
            className={`${styles.likeButton} ${isLiked && !isDislikeButton ? styles.liked : ""} ${
                isDisliked && isDislikeButton ? styles.liked : ""
            }`}
        />
    );
};
