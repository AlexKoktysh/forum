import { type FC } from "react";
import { Avatar, Card, Typography, Button } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import type { TUser } from "../../../entity";

import styles from "./styles.module.scss";

const { Text, Title } = Typography;

interface UserCardProps {
    user: TUser;
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
    const handleUserClick = () => {
        console.log("user.id", user.id);
    };

    return (
        <Card className={styles.userCard} hoverable styles={{ body: { padding: "24px" } }}>
            <div className={styles.userHeader}>
                <Avatar size={64} className={styles.userAvatar} icon={<UserOutlined />} />
                <div className={styles.userInfo}>
                    <Title level={4} className={styles.userName}>
                        {user.username}
                    </Title>
                </div>
            </div>

            <div className={styles.userStats}>
                <div className={styles.statItem}>
                    <CalendarOutlined className={styles.statIcon} />
                    <div className={styles.statContent}>
                        <Text type="secondary" className={styles.statLabel}>
                            Участник с
                        </Text>
                        <Text className={styles.statValue}>Октябрь 2024</Text>
                    </div>
                </div>
            </div>

            <div className={styles.userActions}>
                <Button
                    type="primary"
                    className={styles.primaryAction}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleUserClick();
                    }}
                >
                    Редактировать профиль
                </Button>
            </div>
        </Card>
    );
};
