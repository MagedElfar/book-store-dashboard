import { Box } from "@mui/material";
import React from "react";

import { useLocalize } from "@/shared/lib";

import { ErrorRedirect } from "./ErrorRedirect";

interface Props {
    error?: Error;
    reset?: () => void;
}

export const ErrorFallback: React.FC<Props> = ({ error, reset }) => {
    const { t } = useLocalize("common");
    return (
        <Box width="100%" height="100vh">
            <ErrorRedirect
                title={t("errorFallback.title", "Something went wrong")}
                content={error?.message || t("errorFallback.message", "Unexpected error occurred")}
                btnText={t("errorFallback.reload", "Reload page")}
                rest={reset}
            />
        </Box>

    );
};
