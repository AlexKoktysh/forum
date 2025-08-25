import { useEffect, type FC } from "react";
import { Form, Input, Button, Space } from "antd";
import { useCreatePost } from "../../../entity";
import { useAppSelector, ModalComponent } from "../../../shared";

import styles from "./createModalStyles.module.scss";

const { TextArea } = Input;

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateModal: FC<CreateModalProps> = ({ isOpen, onClose }) => {
    const user = useAppSelector((state) => state.auth.data);
    const [form] = Form.useForm();
    const { createPostHandler, isLoading, isNeedCloseModal } = useCreatePost();

    const handleSubmit = async (values: { title: string; body: string }) => {
        createPostHandler({
            title: values.title,
            body: values.body,
            userId: user?.id ?? 101,
        });
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    useEffect(() => {
        if (isNeedCloseModal) {
            form.resetFields();
            onClose();
        }
    }, [isNeedCloseModal]);

    return (
        <ModalComponent title="✍️ Создать новый пост" isOpen={isOpen} onClose={handleCancel} width={600}>
            <div className={styles.modalContent}>
                <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.createForm}>
                    <Form.Item
                        name="title"
                        label="Заголовок поста"
                        rules={[
                            { required: true, message: "Пожалуйста, введите заголовок поста" },
                            { max: 100, message: "Заголовок не должен превышать 100 символов" },
                        ]}
                    >
                        <Input placeholder="Введите заголовок вашего поста..." className={styles.titleInput} />
                    </Form.Item>

                    <Form.Item
                        name="body"
                        label="Содержание поста"
                        rules={[
                            { required: true, message: "Пожалуйста, введите содержание поста" },
                            { min: 10, message: "Содержание должно содержать минимум 10 символов" },
                            { max: 1000, message: "Содержание не должно превышать 1000 символов" },
                        ]}
                    >
                        <TextArea
                            rows={8}
                            placeholder="Поделитесь своими мыслями..."
                            className={styles.bodyInput}
                            showCount
                            maxLength={1000}
                        />
                    </Form.Item>

                    <Form.Item className={styles.formActions}>
                        <Space>
                            <Button onClick={handleCancel} disabled={isLoading}>
                                Отмена
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                                className={styles.submitButton}
                            >
                                Опубликовать
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </ModalComponent>
    );
};
