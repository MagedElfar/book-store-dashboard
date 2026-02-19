// shared/components/ConfirmDialog.tsx
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Box,
    alpha,
} from "@mui/material";

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    color?: "error" | "primary" | "warning" | "info";
}

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    content,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    loading = false,
    color = "error",
}: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: { borderRadius: 2, p: 1 }
            }}
        >
            <DialogContent sx={{ pb: 2 }}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                    {/* أيقونة تحذيرية تعكس نوع العملية */}
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: "50%",
                            bgcolor: (theme) => alpha(theme.palette[color].main, 0.1),
                            color: `${color}.main`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <WarningAmberRoundedIcon sx={{ fontSize: 40 }} />
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h2" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {content}
                        </Typography>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", gap: 1, pb: 2 }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onClose}
                    disabled={loading}
                    sx={{ minWidth: 100 }}
                >
                    {cancelLabel}
                </Button>
                <Button
                    variant="contained"
                    color={color}
                    onClick={onConfirm}
                    loading={loading}
                    sx={{ minWidth: 100 }}
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}