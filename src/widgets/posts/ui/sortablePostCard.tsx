import { type FC } from "react";
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

export const SortablePostCard: FC<SortablePostCardProps> = ({
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

    const style = sortable
        ? {
              transform: CSS.Transform.toString(transform),
              transition,
              opacity: isDragging ? 0.5 : 1,
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
            {...(sortable ? attributes : {})}
            {...(sortable ? listeners : {})}
        >
            <PostCard post={post} onPostClick={onPostClick} onUserClick={onUserClick} />
        </div>
    );
};
