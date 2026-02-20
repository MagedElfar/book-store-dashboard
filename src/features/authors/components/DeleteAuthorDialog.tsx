// src/features/authors/components/DeleteAuthorDialog.tsx

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmDialog } from "@/shared/components";
import { errorMapper } from "@/shared/utilities";

import { useDeleteAuthor } from "../hooks";

interface Props {
    open: boolean;
    onClose: () => void;
    onRedirect?: () => void;
    authorId: string;
    authorName?: string;
}

function DeleteAuthorDialog({ open, onClose, authorId, authorName, onRedirect }: Props) {
    const { t } = useTranslation(["author", "common"]);
    const { mutateAsync: deleteAuthor, isPending } = useDeleteAuthor();

    const handleConfirm = async () => {
        try {
            await deleteAuthor(authorId);
            toast.success(t("feedback.successDeleteAuthor"));
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
            title={t("deleteAuthorTitle")}
            content={
                authorName
                    ? t("deleteAuthorConfirmWithName", { name: authorName })
                    : t("deleteAuthorConfirm")
            }
            confirmLabel={t("common:actions.delete")}
            color="error"
        />
    );
}

export default DeleteAuthorDialog;
export { DeleteAuthorDialog };