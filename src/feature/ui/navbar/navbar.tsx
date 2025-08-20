import React, { useContext, useMemo } from "react";
import { Menu } from "antd";
import { HomeOutlined, MessageOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../../shared";

import styles from "./styles.module.scss";

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { isAdmin } = useContext(RoleContext);

    const navItems: MenuProps["items"] = useMemo(() => {
        const items = [
            {
                key: "home",
                icon: <HomeOutlined />,
                label: "Главная",
                onClick: () => navigate("/"),
            },
            {
                key: "users",
                icon: <UsergroupAddOutlined />,
                label: "Пользователи",
            },
            {
                key: "favorite",
                icon: <MessageOutlined />,
                label: "Избранное",
            },
        ];
        return items.filter((item) => isAdmin || item.key !== "users");
    }, [isAdmin]);

    return <Menu mode="horizontal" items={navItems} className={styles.mainMenu} selectable={false} />;
};
