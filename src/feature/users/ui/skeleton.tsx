import { type FC } from "react";
import { Card, Skeleton } from "antd";

import styles from "./styles.module.scss";

const SkeletonUserCard: FC = () => (
    <Card className={styles.userCard} bodyStyle={{ padding: "24px" }}>
        <div className={styles.userHeader}>
            <Skeleton.Avatar size={64} active className={styles.userAvatar} />
            <div className={styles.userInfo}>
                <Skeleton.Input style={{ width: 120, height: 24 }} active className={styles.userNameSkeleton} />
                <Skeleton.Input
                    style={{ width: 60, height: 16, marginTop: 8 }}
                    active
                    className={styles.userIdSkeleton}
                />
            </div>
        </div>

        <div className={styles.userStats}>
            <div className={styles.statItem}>
                <div className={styles.statIconSkeleton}>
                    <Skeleton.Avatar size={16} active />
                </div>
                <div className={styles.statContent}>
                    <Skeleton.Input style={{ width: 40, height: 14 }} active className={styles.statLabelSkeleton} />
                    <Skeleton.Input
                        style={{ width: 140, height: 16, marginTop: 4 }}
                        active
                        className={styles.statValueSkeleton}
                    />
                </div>
            </div>

            <div className={styles.statItem}>
                <div className={styles.statIconSkeleton}>
                    <Skeleton.Avatar size={16} active />
                </div>
                <div className={styles.statContent}>
                    <Skeleton.Input style={{ width: 80, height: 14 }} active className={styles.statLabelSkeleton} />
                    <Skeleton.Input
                        style={{ width: 100, height: 16, marginTop: 4 }}
                        active
                        className={styles.statValueSkeleton}
                    />
                </div>
            </div>
        </div>
    </Card>
);

export const SkeletonUserList: FC = () => {
    return (
        <div className={styles.userList}>
            {Array.from({ length: 6 }, (_, index) => (
                <SkeletonUserCard key={index} />
            ))}
        </div>
    );
};
