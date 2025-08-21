import { type FC } from "react";
import { Select, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetUsersList } from "../../../entity";

import styles from "./userFilterStyles.module.scss";

const { Text } = Typography;

interface UserFilterProps {
    selectedUserId: number | null;
    onUserChange: (userId: number | null) => void;
}

export const UserFilter: FC<UserFilterProps> = ({ selectedUserId, onUserChange }) => {
    const { usersList } = useGetUsersList();

    const handleChange = (value: number | null) => {
        onUserChange(value);
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterLabel}>
                <UserOutlined className={styles.filterIcon} />
                <Text strong>Фильтр по автору:</Text>
            </div>

            <Select
                className={styles.userSelect}
                placeholder="Выберите автора"
                allowClear
                clearIcon={<span>✕</span>}
                value={selectedUserId}
                onChange={handleChange}
                options={[
                    { value: null, label: "Все авторы" },
                    ...(usersList ?? []).map(({ username, id }) => ({ label: username, value: id })),
                ]}
                showSearch
                filterOption={(input, option) => option?.label?.toLowerCase().includes(input.toLowerCase()) ?? false}
                size="middle"
                suffixIcon={<UserOutlined />}
            />

            {selectedUserId && (
                <div className={styles.activeFilter}>
                    <Text type="secondary" className={styles.activeFilterText}>
                        Показаны посты от пользователя {selectedUserId}
                    </Text>
                </div>
            )}
        </div>
    );
};
