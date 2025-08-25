import { type FC, type ReactNode } from "react";
import { Modal } from "antd";
import { type ModalProps } from "antd";

import styles from "./styles.module.scss";

interface ModalComponentProps extends Omit<ModalProps, "className"> {
    children: ReactNode;
    isOpen: boolean;
    onClose: (e: any) => void;
    title: string;
}

export const ModalComponent: FC<ModalComponentProps> = ({ children, isOpen, onClose, title, ...modalProps }) => {
    const modalClassName = [styles.modalComponent, styles.defaultVariant].filter(Boolean).join(" ");

    return (
        <Modal
            title={title}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            destroyOnHidden
            className={modalClassName}
            {...modalProps}
        >
            <div className={styles.modalContent}>{children}</div>
        </Modal>
    );
};
