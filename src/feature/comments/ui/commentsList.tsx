import { type FC, useState, useMemo } from "react";
import { Card, Typography, Input, Button, Divider } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useAppSelector, useActions } from "../../../shared";

import styles from "./listStyles.module.scss";

const { Text } = Typography;
const { TextArea } = Input;

interface CommentsListProps {
    postId: number;
}

export const CommentsList: FC<CommentsListProps> = ({ postId }) => {
    const user = useAppSelector((state) => state.auth.data);
    const commentsData = useAppSelector((state) => state.comments.data[postId]);
    const comments = useMemo(() => commentsData || [], [commentsData]);
    const { addComment } = useActions();
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!commentText.trim()) return;

        setIsSubmitting(true);

        const newComment = {
            id: Date.now(),
            postId,
            userName: user?.email ?? "email",
            text: commentText.trim(),
            createdAt: new Date().toISOString(),
        };

        addComment(newComment);
        setCommentText("");
        setIsSubmitting(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Card className={styles.commentsCard} title={`Комментарии (${comments.length})`}>
            {comments.length === 0 ? (
                <div className={styles.commentsPlaceholder}>
                    <Text type="secondary">Пока нет комментариев. Будьте первым!</Text>
                </div>
            ) : (
                <div className={styles.commentsList}>
                    {comments.map((comment) => (
                        <div key={comment.id} className={styles.commentItem}>
                            <div className={styles.commentHeader}>
                                <Text strong>{comment.userName}</Text>
                                <Text type="secondary" className={styles.commentDate}>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </Text>
                            </div>
                            <div className={styles.commentText}>
                                <Text>{comment.text}</Text>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Divider />
            <div className={styles.commentInput}>
                <div className={styles.inputSection}>
                    <TextArea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Напишите ваш комментарий... (Ctrl+Enter для отправки)"
                        rows={3}
                        maxLength={1000}
                        className={styles.textArea}
                        disabled={isSubmitting}
                    />
                    <div className={styles.inputFooter}>
                        <Text type="secondary" className={styles.charCount}>
                            {commentText.length}/1000
                        </Text>
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            onClick={handleSubmit}
                            loading={isSubmitting}
                            disabled={!commentText.trim()}
                            className={styles.submitButton}
                        >
                            Отправить
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};
