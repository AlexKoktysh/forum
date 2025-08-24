import { type FC } from "react";
import { Modal, Typography } from "antd";
import { type TPost } from "../../../entity";
import { CommentsList } from "../../comments";
import { AuthorInfo } from "../../../feature";

import styles from "./modalStyles.module.scss";

const { Text } = Typography;

interface CommentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: TPost | null;
}

export const CommentsModal: FC<CommentsModalProps> = ({ isOpen, onClose, post }) => {
    if (!post) return null;

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Modal
            title="Комментарии к посту"
            open={isOpen}
            onCancel={(e) => {
                e.stopPropagation();
                onClose();
            }}
            footer={null}
            width={800}
            className={styles.commentsModal}
            destroyOnHidden
            maskClosable={true}
        >
            <div className={styles.modalContent} onClick={handleModalClick}>
                <div className={styles.postInfo}>
                    <AuthorInfo post={post} variant="modal" className={styles.postHeader} />

                    <div className={styles.postBody}>
                        <Text className={styles.postText}>
                            {post.body.length > 200 ? `${post.body.slice(0, 200)}...` : post.body}
                        </Text>
                    </div>
                </div>

                <div className={styles.commentsSection}>
                    <CommentsList postId={post.id} />
                </div>
            </div>
        </Modal>
    );
};
