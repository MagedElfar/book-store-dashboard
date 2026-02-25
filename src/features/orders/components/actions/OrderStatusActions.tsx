import {
    Card, CardContent, Typography, TextField, MenuItem,
    Stack, CircularProgress, Box, Chip
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG } from "../../config";
import { useUpdateOrderStatus } from "../../hooks";
import { type OrderStatus, type PaymentStatus } from "../../types";

interface Props {
    orderId: string;
    currentStatus: OrderStatus;
    currentPaymentStatus: string;
}

export function OrderStatusActions({ orderId, currentStatus, currentPaymentStatus }: Props) {
    const { t } = useTranslation("order");
    const { mutate: updateStatus, isPending } = useUpdateOrderStatus(orderId);

    return (
        <Card sx={{ borderRadius: 3, position: 'relative', overflow: 'hidden' }}>

            {isPending && (
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    bgcolor: 'rgba(255,255,255,0.4)', zIndex: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <CircularProgress size={24} />
                </Box>
            )}

            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: 700 }}>
                    {t("actions.update_status")}
                </Typography>

                <Stack spacing={2.5}>
                    <TextField
                        select
                        fullWidth
                        label={t("fields.order_status")}
                        value={currentStatus}
                        size="small"
                        onChange={(e) =>
                            updateStatus({ status: e.target.value as OrderStatus })
                        }
                        slotProps={{
                            select: {
                                renderValue: (selected) => (
                                    <Chip
                                        label={t(`status.${selected}` as any)}
                                        size="small"
                                        color={ORDER_STATUS_CONFIG[selected as OrderStatus].color}
                                        sx={{ fontWeight: 'bold', height: 20 }}
                                    />
                                )
                            }
                        }}
                    >
                        {(Object.keys(ORDER_STATUS_CONFIG) as OrderStatus[]).map((status) => (
                            <MenuItem key={status} value={status}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Box
                                        sx={{
                                            width: 8, height: 8, borderRadius: '50%',
                                            bgcolor: `${ORDER_STATUS_CONFIG[status].color}.main`
                                        }}
                                    />
                                    <Typography variant="body2">
                                        {t(`status.${status}`)}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label={t("fields.payment_status")}
                        value={currentPaymentStatus}
                        size="small"
                        onChange={(e) =>
                            updateStatus({ payment_status: e.target.value as PaymentStatus })
                        }
                        slotProps={{
                            select: {
                                renderValue: (selected) => (
                                    <Chip
                                        label={t(`payments.${selected}` as any)}
                                        size="small"
                                        color={PAYMENT_STATUS_CONFIG[selected as PaymentStatus].color}
                                        sx={{ fontWeight: 'bold', height: 20 }}
                                    />
                                )
                            }
                        }}
                    >
                        {(Object.keys(PAYMENT_STATUS_CONFIG) as PaymentStatus[]).map((pStatus) => (
                            <MenuItem key={pStatus} value={pStatus}>
                                {t(`payments.${pStatus}`)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>

            </CardContent>
        </Card>
    );
}