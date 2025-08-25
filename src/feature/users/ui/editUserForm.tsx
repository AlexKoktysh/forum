import { Button, Form, Input, type FormInstance } from "antd";
import type { FC } from "react";
import { SaveOutlined, UserOutlined } from "@ant-design/icons";
import type { TUser } from "../../../entity";

import styles from "./editStyles.module.scss";

interface IProps {
    user: TUser;
    form: FormInstance<Pick<TUser, "username">>;
    handleCancel: () => void;
    onFinish: (values: Pick<TUser, "username">) => Promise<void>;
}

export const EditUserForm: FC<IProps> = ({ form, user, handleCancel, onFinish }) => {
    return (
        <Form
            form={form}
            name="profileEdit"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className={styles.form}
            requiredMark={false}
            initialValues={{
                username: user.username,
            }}
        >
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Пожалуйста, введите имя пользователя",
                    },
                    {
                        min: 3,
                        message: "Имя пользователя должно содержать минимум 3 символа",
                    },
                    {
                        max: 30,
                        message: "Имя пользователя не должно превышать 30 символов",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className={styles.inputIcon} />}
                    placeholder="Введите имя пользователя"
                    className={styles.input}
                />
            </Form.Item>

            <div className={styles.formActions}>
                <Button onClick={handleCancel} className={styles.cancelButton} size="large">
                    Отмена
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    className={styles.saveButton}
                    size="large"
                >
                    Сохранить
                </Button>
            </div>
        </Form>
    );
};
