import { useEffect } from "react";
import { message } from "antd";
import { usersApi } from "../api";

export const useGetUsersList = () => {
    const { data: usersList, isError } = usersApi.useGetAllUsersQuery(null);

    useEffect(() => {
        isError && message.error("Ошибка при получении списка постов");
    }, [isError]);

    return { usersList };
};
