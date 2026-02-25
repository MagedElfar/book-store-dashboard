import { Paper, Stack, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { SupportedLang } from "@/shared/types";
import { formatPrice } from "@/shared/utilities";

interface OrderSummaryCardProps {
    subtotal: number;
    shippingCost: number;
    vatCost: number;
    finalTotal: number;
    title?: string;
    variant?: "elevation" | "outlined"
}

export function OrderSummaryCard({
    subtotal,
    shippingCost,
    vatCost,
    finalTotal,
    title,
    variant = "outlined"
}: OrderSummaryCardProps) {
    const { t, i18n } = useTranslation("order");

    const lang = i18n.language as SupportedLang
    return (
        <Paper
            variant={variant}
            sx={{
                p: 3,
                bgcolor: (theme) => theme.palette.background.default,
                borderRadius: 2
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title || t("summary.title")}
            </Typography>

            <Stack spacing={1.5}>
                <SummaryRow
                    label={t("summary.subtotal")}
                    value={formatPrice(subtotal, lang)}
                />

                <SummaryRow
                    label={t("summary.shipping")}
                    value={formatPrice(shippingCost, lang)}
                />

                <SummaryRow
                    label={t("summary.vat")}
                    value={formatPrice(vatCost, lang)}
                />

                <Divider sx={{ my: 1 }} />

                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight="bold">
                        {t("summary.total")}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                        {formatPrice(finalTotal, lang)}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary" variant="body2">
                {label}
            </Typography>
            <Typography variant="body2" fontWeight="medium">
                {value}
            </Typography>
        </Stack>
    );
}