import { useEffect } from "react";
import { message } from "antd";
import { usersApi } from "../api";
import { useAppSelector } from "../../../shared";

export const useGetUsersList = () => {
    const users = useAppSelector((state) => state.users);
    const { isError, isFetching } = usersApi.useGetAllUsersQuery(null);

    useEffect(() => {
        isError && message.error("Ошибка при получении списка пользователей");
    }, [isError]);

    return { usersList: users.usersList, isLoading: isFetching };
};
