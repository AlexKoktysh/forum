import { useState, type FC } from "react";
import { Card, Form } from "antd";
import type { TUser } from "../../../entity";
import { EditUserForm, UserHeader, UserInfo } from "../../../feature";
import { useActions, useAppSelector } from "../../../shared";

import styles from "./editStyles.module.scss";

interface IProps {
    user: TUser;
    isDefaultEditMode?: boolean;
    onClose?: () => void;
}

export const EditUser: FC<IProps> = ({ user, isDefaultEditMode = false, onClose }) => {
    const myProfile = useAppSelector((state) => state.auth.data);
    const [isEditing, setIsEditing] = useState(isDefaultEditMode);

    const { changingUser, setAuthUser } = useActions();
    const [form] = Form.useForm();

    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue({
            username: user.username,
        });
    };
    const handleCancel = () => {
        setIsEditing(false);
        form.resetFields();
    };

    const onFinish = async (values: Pick<TUser, "username">) => {
        changingUser({ id: user.id, username: values.username });
        myProfile?.id === user.id && setAuthUser({ ...myProfile, email: values.username });
        setIsEditing(false);
        onClose?.();
    };

    return (
        <Card className={styles.profileCard} styles={{ body: { padding: "32px" } }}>
            <UserHeader user={user} isEditing={isEditing} handleEdit={handleEdit} />
            {isEditing ? (
                <EditUserForm form={form} handleCancel={handleCancel} onFinish={onFinish} user={user} />
            ) : (
                <UserInfo user={user} />
            )}
        </Card>
    );
};
