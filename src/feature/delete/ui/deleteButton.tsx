import { Button } from "antd";
import { useMemo, type FC } from "react";
import { useDeletePost } from "../../../entity";

import styles from "./styles.module.scss";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

interface IProps {
    postId: number;
}

export const DeleteButton: FC<IProps> = ({ postId }) => {
    const { deletePostHandler, deletingPostId } = useDeletePost();

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        deletePostHandler(postId);
    };

    const icon = useMemo(() => {
        return deletingPostId === postId ? <LoadingOutlined spin /> : <DeleteOutlined />;
    }, [deletingPostId, postId]);

    return <Button type="text" size="middle" icon={icon} onClick={handleDeleteClick} className={styles.deleteButton} />;
};
