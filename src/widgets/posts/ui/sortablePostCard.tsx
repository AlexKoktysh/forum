import { type FC, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: post.id,
        disabled: !sortable,
    });

    // Упрощенные стили без лишней мемоизации
    const style = sortable
        ? {
              transform: CSS.Transform.toString(transform),
              transition: isDragging ? "none" : transition,
              opacity: isDragging ? 0.5 : 1,
          }
        : {};

    // Упрощенный className
    const className = `${styles.postWrapper} ${isDeleting ? styles.fadingOut : ""} ${
        isDeleting ? styles.deleting : ""
    } ${isDragging && sortable ? styles.dragging : ""}`;

    // Упрощенные drag props
    const dragProps = sortable ? { ...attributes, ...listeners } : {};

    return (
        <div ref={setNodeRef} style={style} className={className} data-sortable={sortable} {...dragProps}>
            <PostCard post={post} onPostClick={onPostClick} onUserClick={onUserClick} />
        </div>
    );
};

// Упрощенная мемоизация - только ключевые проверки
export const SortablePostCard = memo(SortablePostCardComponent, (prevProps, nextProps) => {
    return (
        prevProps.post.id === nextProps.post.id &&
        prevProps.isDeleting === nextProps.isDeleting &&
        prevProps.sortable === nextProps.sortable
    );
});
