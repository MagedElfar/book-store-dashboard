import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmDialog } from "@/shared/components";
import { errorMapper } from "@/shared/utilities";

import { useDeleteUser } from "../hooks";

interface Props {
    open: boolean;
    onClose: () => void;
    onRedirect?: () => void
    userId: string;
    userName?: string;
}

function DeleteUserDialog({ open, onClose, userId, userName, onRedirect }: Props) {
    const { t } = useTranslation(["user", "common"]);
    const { mutateAsync: deleteUser, isPending } = useDeleteUser();

    const handleConfirm = async () => {
        try {
            await deleteUser(userId);
            onClose()
            onRedirect?.()
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    };

    return (
        <ConfirmDialog
            open={open}
            onClose={onClose}
            onConfirm={handleConfirm}
            loading={isPending}
            title={t("deleteUserTitle")}
            content={
                userName
                    ? t("deleteUserConfirmWithName", { name: userName })
                    : t("deleteUserConfirm")
            }
            confirmLabel={t("common:actions.delete")}
            color="error"
        />
    );
}

export default DeleteUserDialog

export { DeleteUserDialog }