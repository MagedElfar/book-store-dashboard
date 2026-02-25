import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent, Box, IconButton, type Breakpoint } from "@mui/material";
import type { ReactNode } from "react";

export interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode,
    title: string
    maxWidth?: false | Breakpoint | undefined

}

export function FormDialog({ open, onClose, title, children, maxWidth = "sm" }: Props) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={maxWidth}
            disableRestoreFocus
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {title}

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
                    {children}
                </Box>
            </DialogContent>
        </Dialog>
    );
}