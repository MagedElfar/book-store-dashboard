// src/features/tags/components/TagDialog.tsx

import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent, Box, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

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
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            disableRestoreFocus
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {tag ? t("editTag") : t("createTag")}

                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 3 }}>
                <Box sx={{ pt: 1 }}>
                    <TagForm
                        tag={tag}
                        onSuccess={onClose}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}