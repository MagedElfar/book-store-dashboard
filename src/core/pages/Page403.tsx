import GppBadIcon from "@mui/icons-material/GppBad";
import { Box, Card, CardContent, Stack, Typography, Button } from "@mui/material";

import { useLocalize } from "@/shared/lib";

interface Props {
    message?: string;
    reset?: () => void;
}

export default function Page403({
    message,
    reset,
}: Props) {
    const { t } = useLocalize("common");

    return (
        <Box
            width="100%"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={2}
        >
            <Card
                sx={{
                    maxWidth: 420,
                    width: "100%",
                    textAlign: "center",
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3} alignItems="center">
                        <GppBadIcon
                            color="error"
                            sx={{ fontSize: 64 }}
                        />

                        <Typography variant="h4">
                            {t("forbidden.title")}
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            {message ||
                                t("forbidden.message")}
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={reset}
                        >
                            {t("forbidden.action")}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
