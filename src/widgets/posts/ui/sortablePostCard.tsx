import { type FC, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HolderOutlined } from "@ant-design/icons";
import type { TPost } from "../../../entity/posts/model";
import { PostCard } from "../../../feature";

import styles from "./styles.module.scss";

interface SortablePostCardProps {
    post: TPost;
    isDeleting: boolean;
    onPostClick: (postId: number) => void;
    onUserClick: (userId: number) => void;
    sortable?: boolean;
}

const SortablePostCardComponent: FC<SortablePostCardProps> = ({
    post,
    isDeleting,
    onPostClick,
    onUserClick,
    sortable = true,
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
        id: post.id,
        disabled: !sortable,
    });

    const style = sortable
        ? {
              transform: CSS.Transform.toString(transform),
              transition: "none",
              opacity: isDragging ? 0.8 : 1,
              zIndex: isDragging ? 1000 : 1,
          }
        : {};

    const className = `${styles.postWrapper} ${isDeleting ? styles.fadingOut : ""} ${
        isDeleting ? styles.deleting : ""
    } ${isDragging && sortable ? styles.dragging : ""}`;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={className}
            data-sortable={sortable}
            data-sortable-id={post.id}
            {...attributes}
        >
            {sortable && (
                <div className={styles.dragHandle} {...listeners}>
                    <HolderOutlined />
                </div>
            )}
            <PostCard post={post} onPostClick={onPostClick} onUserClick={onUserClick} />
        </div>
    );
};

export const SortablePostCard = memo(SortablePostCardComponent, (prevProps, nextProps) => {
    return (
        prevProps.post.id === nextProps.post.id &&
        prevProps.isDeleting === nextProps.isDeleting &&
        prevProps.sortable === nextProps.sortable
    );
});
