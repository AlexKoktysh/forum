import type { FC } from "react";
import { Typography } from "antd";
import type { TUser } from "../../../entity";

import styles from "./editStyles.module.scss";

interface IProps {
    user: TUser;
}

const { Title, Text } = Typography;

export const UserInfo: FC<IProps> = ({ user }) => {
    return (
        <div className={styles.profileDisplay}>
            <div className={styles.infoSection}>
                <div className={styles.infoItem}>
                    <Text className={styles.infoLabel}>Имя пользователя</Text>
                    <Title level={4} className={styles.infoValue}>
                        {user.username}
                    </Title>
                </div>

                <div className={styles.infoItem}>
                    <Text className={styles.infoLabel}>ID пользователя</Text>
                    <Title level={4} className={styles.infoValue}>
                        #{user.id}
                    </Title>
                </div>
            </div>
        </div>
    );
};
