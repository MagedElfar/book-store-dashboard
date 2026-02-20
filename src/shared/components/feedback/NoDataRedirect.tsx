// src/shared/components/NoDataRedirect.tsx

import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

interface Props {
    title: string;
    content: string;
    btnText?: string;
    redirectPath?: string;
    onAction?: () => void;
}

export function NoDataRedirect({ title, content, btnText, redirectPath, onAction }: Props) {
    const navigate = useNavigate();

    const handleAction = () => {
        if (redirectPath) {
            navigate(redirectPath);
            return;
        }
        onAction?.();
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "transparent", // غالباً يوضع داخل صفحة بها wrapper فعلاً
                height: "100%",
                minHeight: 400,
                py: 5
            }}
        >
            <Card
                elevation={0} // جعل الكارت مسطحاً أكثر ليعطي شعور الـ Empty State
                sx={{
                    maxWidth: 420,
                    width: "100%",
                    textAlign: "center",
                    bgcolor: "transparent",
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Stack spacing={2} alignItems="center">
                        {/* Icon Container with subtle background */}
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: "50%",
                                bgcolor: "action.hover",
                                mb: 1
                            }}
                        >
                            <SearchOffRoundedIcon
                                sx={{ fontSize: 80, color: "text.disabled" }}
                            />
                        </Box>

                        <Typography variant="h6" fontWeight="bold">
                            {title}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ whiteSpace: "pre-line", px: 2 }}
                        >
                            {content}
                        </Typography>

                        {btnText && (
                            <Button
                                color="primary"
                                variant="outlined"
                                sx={{ mt: 2, px: 4, borderRadius: 2 }}
                                onClick={handleAction}
                            >
                                {btnText}
                            </Button>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}