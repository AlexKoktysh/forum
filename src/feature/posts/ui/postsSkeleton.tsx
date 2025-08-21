import { type FC } from "react";
import { Skeleton, Card } from "antd";
import styles from "./skeletonStyles.module.scss";

interface PostsSkeletonProps {
    count?: number;
}

export const PostsSkeleton: FC<PostsSkeletonProps> = ({ count = 3 }) => {
    return (
        <div className={styles.postsContainer}>
            <div className={styles.header}>
                <Skeleton.Input style={{ width: 200, height: 32 }} active size="large" />
                <Skeleton.Button style={{ width: 80, height: 24 }} active size="small" />
            </div>

            <div className={styles.postsList}>
                {Array.from({ length: count }).map((_, index) => (
                    <Card key={index} className={styles.skeletonCard}>
                        <div className={styles.skeletonHeader}>
                            <Skeleton.Avatar size={48} active />
                            <div className={styles.skeletonMeta}>
                                <Skeleton.Input style={{ width: 280, height: 20 }} active size="small" />
                                <Skeleton.Input style={{ width: 150, height: 16, marginTop: 8 }} active size="small" />
                            </div>
                        </div>

                        <div className={styles.skeletonBody}>
                            <Skeleton paragraph={{ rows: 3, width: ["100%", "95%", "70%"] }} title={false} active />
                        </div>

                        <div className={styles.skeletonFooter}>
                            <div className={styles.skeletonTags}>
                                <Skeleton.Button style={{ width: 60, height: 22 }} active size="small" />
                                <Skeleton.Button style={{ width: 70, height: 22 }} active size="small" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
