import { type FC, useState } from "react";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../shared";
import type { TPost } from "../../../entity";
import { CommentsModal } from "./commentsModal";

import styles from "./styles.module.scss";

interface CommentButtonProps {
    postId: number;
    post: TPost;
}

export const CommentButton: FC<CommentButtonProps> = ({ postId, post }) => {
    const comments = useAppSelector((state) => state.comments.data[postId] || []);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                type="text"
                size="middle"
                icon={<MessageOutlined />}
                onClick={handleClick}
                className={styles.commentButton}
            >
                <span>Комментарии ({comments.length})</span>
            </Button>

            <CommentsModal isOpen={isModalOpen} onClose={handleCloseModal} post={post} />
        </>
    );
};
