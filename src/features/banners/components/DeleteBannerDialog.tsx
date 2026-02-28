import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmDialog } from "@/shared/components";
import { errorMapper } from "@/shared/utilities";

import { useDeleteBanner } from "../hooks";

interface Props {
    open: boolean;
    onClose: () => void;
    onRedirect?: () => void;
    bannerId: string;
    bannerTitle?: string;
}

export function DeleteBannerDialog({ open, onClose, bannerId, bannerTitle, onRedirect }: Props) {
    const { t } = useTranslation(["banner", "common"]);
    const { mutateAsync: deleteBanner, isPending } = useDeleteBanner();

    const handleConfirm = async () => {
        try {
            await deleteBanner(bannerId);
            toast.success(t("feedback.successDeleteBanner"));
            onClose();
            onRedirect?.();
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
            title={t("actions.deleteBanner")}
            content={
                bannerTitle
                    ? t("messages.confirmDeleteBanner", { title: bannerTitle })
                    : t("messages.confirmDeleteBannerGeneric")
            }
            confirmLabel={t("common:actions.delete")}
            color="error"
        />
    );
}

export default DeleteBannerDialog;