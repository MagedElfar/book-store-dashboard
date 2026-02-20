// src/features/categories/components/DeleteCategoryDialog.tsx

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmDialog } from "@/shared/components";
import { errorMapper } from "@/shared/utilities";

import { useDeleteCategory } from "../hooks";

interface Props {
    open: boolean;
    onClose: () => void;
    onRedirect?: () => void;
    categoryId: string;
    categoryName?: string;
}

function DeleteCategoryDialog({ open, onClose, categoryId, categoryName, onRedirect }: Props) {
    const { t } = useTranslation(["category", "common"]);
    const { mutateAsync: deleteCategory, isPending } = useDeleteCategory();

    const handleConfirm = async () => {
        try {
            await deleteCategory(categoryId);
            toast.success(t("feedback.successDeleteCategory"));
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
            title={t("deleteCategoryTitle")}
            content={
                categoryName
                    ? t("deleteCategoryConfirmWithName", { name: categoryName })
                    : t("deleteCategoryConfirm")
            }
            confirmLabel={t("common:actions.delete")}
            color="error"
        />
    );
}

export default DeleteCategoryDialog;
export { DeleteCategoryDialog };