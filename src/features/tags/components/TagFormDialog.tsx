import { FormDialog } from "@/shared/components";
import { useLocalize } from "@/shared/lib";

import type { Tag } from "../types";

import { TagForm } from "./../forms";

interface Props {
    open: boolean;
    onClose: () => void;
    tag?: Tag | null;
}

export function TagFormDialog({ open, onClose, tag }: Props) {
    const { t } = useLocalize("tag");

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            title={tag ? t("editTag") : t("createTag")}
        >

            <TagForm
                tag={tag}
                onSuccess={onClose}
            />
        </FormDialog>
    );
}