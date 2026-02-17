import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { paths } from "@/shared/constants";

interface VerifiedPageProps {
    rootPath?: string;
}

const VerifiedPage: React.FC<VerifiedPageProps> = ({
    rootPath = "/profile",
}) => {
    const { t } = useTranslation("account");
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const error = params.get("error");
        const errorDescription = params.get("error_description");

        if (error) {
            const message = decodeURIComponent(
                errorDescription || t("verified.errorContent")
            );

            setErrorMessage(message);
        }
    }, [navigate, t]);

    const handleContinue = () => {
        navigate(rootPath);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                height: "100%"
            }}
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

                        {/* Error */}
                        {errorMessage ? (
                            <>
                                <ErrorOutlineRoundedIcon
                                    sx={{ fontSize: 72, color: "error.main" }}
                                />

                                <Typography variant="h5">
                                    {t("verified.errorTitle", "Verification Failed")}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {errorMessage}
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={() => navigate(paths.account.root)}
                                >
                                    {t("verified.errorBtn")}
                                </Button>
                            </>
                        ) : (
                            <>
                                <CheckCircleRoundedIcon
                                    sx={{ fontSize: 72, color: "success.main" }}
                                />

                                <Typography variant="h5">
                                    {t("verified.title")}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ whiteSpace: "pre-line" }}
                                >
                                    {t("verified.content")}
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleContinue}
                                >
                                    {t("verified.btn")}
                                </Button>
                            </>
                        )}

                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default VerifiedPage;
