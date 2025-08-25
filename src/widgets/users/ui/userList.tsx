import type { FC } from "react";
import { useGetUsersList } from "../../../entity";
import { SkeletonUserList, UserCard } from "../../../feature";

import styles from "./styles.module.scss";

export const UserList: FC = () => {
    const { usersList, isLoading } = useGetUsersList();

    if (isLoading) return <SkeletonUserList />;

    if (!usersList || usersList.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>Пользователи не найдены</h3>
                <p>Список пользователей пуст или не удалось загрузить данные.</p>
            </div>
        );
    }

    return (
        <div className={styles.userList}>
            {usersList.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};
