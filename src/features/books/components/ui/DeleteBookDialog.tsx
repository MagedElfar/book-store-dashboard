// src/features/books/components/DeleteBookDialog.tsx

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmDialog } from "@/shared/components";
import { errorMapper } from "@/shared/utilities";

import { useDeleteBook } from "../../hooks";

interface Props {
    open: boolean;
    onClose: () => void;
    onRedirect?: () => void;
    bookId: string;
    bookTitle?: string;
}

function DeleteBookDialog({ open, onClose, bookId, bookTitle, onRedirect }: Props) {
    const { t } = useTranslation(["book", "common"]);
    const { mutateAsync: deleteBook, isPending } = useDeleteBook();

    const handleConfirm = async () => {
        try {
            await deleteBook(bookId);
            toast.success(t("feedback.successDeleteBook"));
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
            title={t("deleteBookTitle")}
            content={
                bookTitle
                    ? t("deleteBookConfirmWithTitle", { title: bookTitle })
                    : t("deleteBookConfirm")
            }
            confirmLabel={t("common:actions.delete")}
            color="error"
        />
    );
}

export default DeleteBookDialog;
export { DeleteBookDialog };