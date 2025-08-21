import { useContext, type FC } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, MailOutlined, LoginOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import type { TAuthDto } from "../../../entity";
import { AuthContext } from "../../../shared";

const { Title, Text } = Typography;

export const LoginForm: FC = () => {
    const { signInHandler } = useContext(AuthContext);
    const [form] = Form.useForm();

    const onFinish = (values: TAuthDto) => {
        signInHandler(values);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.header}>
                <div className={styles.logoIcon}>
                    <UserOutlined />
                </div>
                <Title level={2} className={styles.title}>
                    Добро пожаловать
                </Title>
                <Text className={styles.subtitle}>Войдите в свой аккаунт</Text>
            </div>

            <Form
                form={form}
                name="login"
                onFinish={onFinish}
                layout="vertical"
                size="large"
                className={styles.form}
                requiredMark={false}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите ваш email",
                        },
                        {
                            type: "email",
                            message: "Пожалуйста, введите корректный email",
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className={styles.inputIcon} />}
                        placeholder="example@email.com"
                        className={styles.input}
                    />
                </Form.Item>

                <Form.Item name="isAdmin" valuePropName="checked">
                    <Checkbox className={styles.checkbox}>Я администратор</Checkbox>
                </Form.Item>

                <Form.Item className={styles.submitWrapper}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<LoginOutlined />}
                        className={styles.submitButton}
                        block
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
