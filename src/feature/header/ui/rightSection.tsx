import { useContext, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space, type MenuProps } from "antd";
import { AuthContext } from "../../../shared";
import { CreateModal } from "../../posts";

import styles from "./styles.module.scss";

export const RightSection: FC = () => {
    const navigate = useNavigate();
    const { signOutHandler } = useContext(AuthContext);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const profileMenuItems: MenuProps["items"] = [
        {
            key: "profile",
            label: "Профиль",
            icon: <UserOutlined />,
            onClick: () => navigate("/"),
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            label: "Выйти",
            icon: <LogoutOutlined />,
            danger: true,
            onClick: () => signOutHandler(),
        },
    ];

    return (
        <>
            <Space size="middle" className={styles.rightSection}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className={styles.createButton}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Создать пост
                </Button>

                <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" trigger={["click"]}>
                    <Avatar size="large" icon={<UserOutlined />} className={styles.avatar} />
                </Dropdown>
            </Space>

            <CreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </>
    );
};
