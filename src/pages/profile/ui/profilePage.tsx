import { type FC } from "react";
import { Typography, Spin } from "antd";
import { useAppSelector } from "../../../shared";
import { EditUser } from "../../../widgets";

import styles from "./styles.module.scss";

const { Title } = Typography;

export const ProfilePage: FC = () => {
    const currentUser = useAppSelector((state) => state.auth.data);

    if (!currentUser) {
        return (
            <div className={styles.loadingContainer}>
                <Spin size="large" />
                <Title level={4} className={styles.loadingText}>
                    Загрузка профиля...
                </Title>
            </div>
        );
    }

    return (
        <div className={styles.profilePageContainer}>
            <div className={styles.profileContent}>
                <EditUser
                    user={{
                        id: currentUser.id,
                        username: currentUser.email,
                    }}
                />
            </div>
        </div>
    );
};
