import { Box, Stack, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { SupportedLang } from "@/shared/types";
import { formatPrice } from "@/shared/utilities";

interface ReviewItem {
    id: string
    name: string;
    quantity: number;
    price: number;
}

interface OrderItemsReviewProps {
    items: ReviewItem[];
    maxHeight?: number | string;
    title?: string;
}

export function OrderItemsReview({
    items,
    maxHeight = 240,
    title,
}: OrderItemsReviewProps) {
    const { t, i18n } = useTranslation("order");

    const lang = i18n.language as SupportedLang

    return (
        <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
                {title || `${t("summary.items_review")} (${items.length})`}
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    maxHeight: maxHeight,
                    overflow: 'auto',
                    p: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: 'divider',
                        borderRadius: '10px'
                    }
                }}
            >
                {items.length > 0 ? (
                    <Stack spacing={0.5}>
                        {items.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    p: 1,
                                    borderRadius: 1,
                                    transition: 'background 0.2s',
                                    '&:hover': { bgcolor: 'action.hover' },
                                    '&:not(:last-child)': {
                                        borderBottom: '1px dashed',
                                        borderColor: 'divider'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                                    <Box
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'primary.contrastText',
                                            borderRadius: 1,
                                            px: 1,
                                            py: 0.2,
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {item.quantity}x
                                    </Box>
                                    <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                                        {item.name}
                                    </Typography>
                                </Box>

                                <Typography variant="body2" fontWeight="bold">
                                    {formatPrice(item.price * item.quantity, lang)}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="caption" color="text.disabled">
                            {t("messages.noItemsYet")}
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Stack>
    );
}