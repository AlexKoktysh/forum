import React, { useContext, useMemo } from "react";
import { Menu } from "antd";
import { HeartOutlined, MessageOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../../shared";

import styles from "./styles.module.scss";

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { isAdmin } = useContext(RoleContext);

    const navigateHandler = (route: string) => {
        navigate(route);
    };

    const navItems: MenuProps["items"] = useMemo(() => {
        const items = [
            {
                key: "users",
                icon: <UsergroupAddOutlined />,
                label: "Пользователи",
                onClick: () => navigateHandler("/users"),
            },
            {
                key: "posts",
                icon: <MessageOutlined />,
                label: "Посты",
                onClick: () => navigateHandler("/posts"),
            },
            {
                key: "favorite",
                icon: <HeartOutlined />,
                label: "Избранное",
                onClick: () => navigateHandler("/favorite"),
            },
        ];
        return items.filter((item) => isAdmin || item.key !== "users");
    }, [isAdmin]);

    return <Menu mode="horizontal" items={navItems} className={styles.mainMenu} selectable={false} />;
};
