import { type FC } from "react";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useActions } from "../../../shared";

import styles from "./styles.module.scss";

interface CommentButtonProps {
    postId: number;
}

export const CommentButton: FC<CommentButtonProps> = ({ postId }) => {
    const { addComment } = useActions();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        const newComment = {
            id: Date.now(),
            postId,
            userId: 1,
            text: "Новый комментарий!",
            createdAt: new Date().toISOString(),
        };
        addComment(newComment);
    };

    return (
        <Button
            type="text"
            size="middle"
            icon={<MessageOutlined />}
            onClick={handleClick}
            className={styles.commentButton}
        />
    );
};
