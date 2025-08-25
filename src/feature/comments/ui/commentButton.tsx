import { type FC, useState, useMemo } from "react";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../shared";
import { CommentsModal } from "./commentsModal";

import styles from "./styles.module.scss";

interface CommentButtonProps {
    postId: number;
}

export const CommentButton: FC<CommentButtonProps> = ({ postId }) => {
    const post = useAppSelector((state) => state.posts.postsList.find(({ id }) => postId === id));
    const commentsData = useAppSelector((state) => state.comments.data[postId]);
    const comments = useMemo(() => commentsData || [], [commentsData]);
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
