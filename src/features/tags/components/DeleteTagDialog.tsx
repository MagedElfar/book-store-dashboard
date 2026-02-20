import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmDialog } from "@/shared/components";
import { errorMapper } from "@/shared/utilities";

import { useDeleteTag } from "../hooks";

interface Props {
    open: boolean;
    onClose: () => void;
    onRedirect?: () => void;
    tagId: string;
    tagName?: string;
}

function DeleteTagDialog({ open, onClose, tagId, tagName, onRedirect }: Props) {
    const { t } = useTranslation(["tag", "common"]);
    const { mutateAsync: deleteTag, isPending } = useDeleteTag();

    const handleConfirm = async () => {
        try {
            await deleteTag(tagId);
            toast.success(t("feedback.successDeleteTag"));
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
            title={t("deleteTagTitle")}
            content={
                tagName
                    ? t("deleteTagConfirmWithName", { name: tagName })
                    : t("deleteTagConfirm")
            }
            confirmLabel={t("common:actions.delete")}
            color="error"
        />
    );
}

export default DeleteTagDialog;
export { DeleteTagDialog };