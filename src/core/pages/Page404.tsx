import SearchOffIcon from "@mui/icons-material/SearchOff";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
    message?: string;
    reset?: () => void;
}

export default function Page404({
    message,
    reset,
}: Props) {
    const { t } = useTranslation("common");
    const navigate = useNavigate();

    const handleAction = () => {
        if (reset) {
            reset();
        } else {
            navigate("/");
        }
    };

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

                        <SearchOffIcon
                            color="warning"
                            sx={{ fontSize: 72 }}
                        />

                        <Typography variant="h4">
                            {t("notFound.title")}
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            {message ||
                                t("notFound.message")}
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={handleAction}
                        >
                            {t("notFound.action")}
                        </Button>

                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
