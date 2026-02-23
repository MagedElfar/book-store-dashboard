import { useTranslation } from "react-i18next";

import { FormDialog } from "@/shared/components";

import type { Tag } from "../types";

import { TagForm } from "./../forms";

interface Props {
    open: boolean;
    onClose: () => void;
    tag?: Tag | null;
}

export function TagFormDialog({ open, onClose, tag }: Props) {
    const { t } = useTranslation("tag");

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