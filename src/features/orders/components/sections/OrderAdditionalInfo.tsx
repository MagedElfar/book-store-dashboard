import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NoteIcon from '@mui/icons-material/Note';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Card, CardContent, Stack, Box, Divider, useTheme, useMediaQuery, Typography, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

import { fDateTime } from '@/shared/utilities';

import type { Order } from "../../types";

interface Props {
    order: Order;
}

export function OrderAdditionalInfo({ order }: Props) {
    const { t } = useTranslation(["order", "common"]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));


    return (
        <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
                <Stack
                    direction={{ md: "row", xs: "column" }}
                    spacing={{ xs: 3, md: 3 }}
                    divider={
                        <Divider
                            orientation={isMobile ? "horizontal" : "vertical"}
                            flexItem
                            sx={{ opacity: 0.6 }}
                        />
                    }
                >
                    <Stack spacing={2.5} flex={1}>
                        <Stack direction="row" alignItems="center" spacing={1.5} color="primary.main">
                            <Box sx={{ bgcolor: 'primary.lighter', p: 0.8, borderRadius: 1.5, display: 'flex' }}>
                                <AccessTimeIcon fontSize="small" />
                            </Box>
                            <Typography variant="subtitle1" fontWeight="700">
                                {t("order_details_tab")}
                            </Typography>
                        </Stack>

                        <Stack spacing={2}>
                            <InfoRow
                                title={t("fields.created_at")}
                                icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                                text={fDateTime(order.created_at)}
                            />
                            <InfoRow
                                title={t("fields.payment_method")}
                                icon={<PaymentsIcon sx={{ fontSize: 16 }} />}
                                text={t(`methods.${order.payment_method}` as any)}
                                isBadge
                            />
                        </Stack>
                    </Stack>

                    <Stack spacing={2.5} flex={1}>
                        <Stack direction="row" alignItems="center" spacing={1.5} color="primary.main">
                            <Box sx={{ bgcolor: 'primary.lighter', p: 0.8, borderRadius: 1.5, display: 'flex' }}>
                                <NoteIcon fontSize="small" />
                            </Box>
                            <Typography variant="subtitle1" fontWeight="700">
                                {t("fields.orderNotes")}
                            </Typography>
                        </Stack>

                        <Stack spacing={2}>
                            <InfoRow
                                title={t("fields.orderNotes")}
                                icon={<NoteIcon sx={{ fontSize: 16 }} />}
                                text={order.note || t("common:no_notes")}
                                isItalic={!order.note}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

function InfoRow({ icon, title, text, isBadge, isItalic }: {
    icon: React.ReactNode,
    title: string,
    text: string | number,
    isBadge?: boolean,
    isItalic?: boolean
}) {
    return (
        <Stack direction="column" spacing={0.8} alignItems="flex-start">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                <Box sx={{ display: 'flex', opacity: 0.8 }}>{icon}</Box>
                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {title}
                </Typography>
            </Stack>

            <Box sx={{ pl: 3.2 }}>
                {isBadge ? (
                    <Chip
                        label={text}
                        size="small"
                        color="secondary"
                        sx={{ fontWeight: 700, borderRadius: 1 }}
                    />
                ) : (
                    <Typography
                        variant="body2"
                        color={isItalic ? "text.disabled" : "text.primary"}
                        sx={{ fontWeight: 600, fontStyle: isItalic ? 'italic' : 'normal' }}
                    >
                        {text}
                    </Typography>
                )}
            </Box>
        </Stack>
    );
}