import { type FC } from "react";
import { EditUser } from "../../../widgets";
import type { TUser } from "../../../entity";
import { ModalComponent } from "../../../shared";

interface EditUserModalProps {
    user: TUser;
    isOpen: boolean;
    onClose: () => void;
}

export const EditUserModal: FC<EditUserModalProps> = ({ user, isOpen, onClose }) => {
    return (
        <ModalComponent title="👤 Редактирование профиля" isOpen={isOpen} onClose={onClose} width={600} centered>
            <EditUser user={user} isDefaultEditMode={true} onClose={onClose} />
        </ModalComponent>
    );
};
