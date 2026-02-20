import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmDialog } from "@/shared/components";
import { errorMapper } from "@/shared/utilities";

import { useDeleteAddress } from "../hooks";

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    addressId: string;
    userId: string;
}

function DeleteAddressDialog({ open, onClose, addressId, userId, onSuccess }: Props) {
    const { t } = useTranslation(["address", "common"]);

    const { mutateAsync: deleteAddress, isPending } = useDeleteAddress(userId);

    const handleConfirm = async () => {
        try {
            await deleteAddress(addressId);
            toast.success(t("feedback.successDeleteAddress"));
            onSuccess?.(); // تحديث القائمة بعد الحذف
            onClose();
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <ConfirmDialog
            open={open}
            onClose={onClose}
            onConfirm={handleConfirm}
            loading={isPending}
            title={t("dialogs.deleteTitle")}
            content={t("dialogs.deleteDescription")}
            confirmLabel={t("common:actions.delete")}
            color="error"
        />
    );
}

export { DeleteAddressDialog };
export default DeleteAddressDialog;