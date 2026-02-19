import { Stack, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ErrorRedirect } from "./ErrorRedirect";

interface DataHandlerProps<T> {
    isLoading: boolean;
    isError: boolean;
    data: T | null | undefined;
    onRetry?: () => void;
    loadingComponent?: React.ReactNode;
    errorTitle?: string;
    isEmpty?: boolean;
    emptyComponent?: React.ReactNode;
    children: (data: T) => React.ReactNode;
}

export function DataHandler<T>({
    isLoading,
    isError,
    data,
    onRetry,
    loadingComponent,
    isEmpty,
    emptyComponent,
    children,
}: DataHandlerProps<T>) {
    const { t } = useTranslation("common");

    // 1. حالة التحميل
    if (isLoading) {
        return (
            loadingComponent || (
                <Stack spacing={2} sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1 }} />
                </Stack>
            )
        );
    }

    if (isError) {
        return (
            <ErrorRedirect
                title={t("errorFallback.noRecords")}
                content={t("errorFallback.noRecordsMsg")}
                btnText={t("errorFallback.tryAgain")}
                rest={onRetry}
            />
        );
    }

    if (isEmpty || !data) {
        return emptyComponent || (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                {t("notFound.noRecordsMsg")}
            </Typography>
        );
    }

    return <>{children(data)}</>;
}