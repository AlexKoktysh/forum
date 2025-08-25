import type { FC } from "react";
import { Avatar, Button, Typography } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import type { TUser } from "../../../entity";
import { useAppSelector } from "../../../shared";

import styles from "./editStyles.module.scss";

const { Title, Text } = Typography;

interface IProps {
    user: TUser;
    isEditing: boolean;
    handleEdit: () => void;
}

export const UserHeader: FC<IProps> = ({ isEditing, user, handleEdit }) => {
    const myProfile = useAppSelector((state) => state.auth.data);

    return (
        <div className={styles.profileHeader}>
            <div className={styles.avatarSection}>
                <Avatar size={80} className={styles.profileAvatar} icon={<UserOutlined />} />
                <div className={styles.profileInfo}>
                    <Title level={2} className={styles.profileTitle}>
                        {isEditing
                            ? "Редактирование профиля"
                            : myProfile?.id === user.id
                            ? "Мой профиль"
                            : "Профиль пользователя"}
                    </Title>
                    <Text className={styles.profileSubtitle}>
                        {isEditing
                            ? `Обновите информацию о ${myProfile?.id === user.id ? "себе" : "пользователе"}`
                            : ""}
                    </Text>
                </div>
            </div>

            {!isEditing && (
                <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} className={styles.editButton}>
                    Редактировать
                </Button>
            )}
        </div>
    );
};
