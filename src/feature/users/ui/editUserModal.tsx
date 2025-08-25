import { type FC } from "react";
import { Modal } from "antd";
import { EditUser } from "../../../widgets";
import type { TUser } from "../../../entity";

import styles from "./editUserModalStyles.module.scss";

interface EditUserModalProps {
    user: TUser;
    isOpen: boolean;
    onClose: () => void;
}

export const EditUserModal: FC<EditUserModalProps> = ({ user, isOpen, onClose }) => {
    return (
        <Modal
            title={null}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            className={styles.editUserModal}
            width={600}
            centered
            destroyOnHidden
        >
            <EditUser user={user} isDefaultEditMode={true} onClose={onClose} />
        </Modal>
    );
};
