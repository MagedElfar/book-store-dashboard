import { Stack, TextField, Chip, MenuItem, Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG } from "../../config";
import { useUpdateOrderStatus } from "../../hooks";
import type { OrderStatus, PaymentStatus } from "../../types";

interface Props {
    orderId: string;
    currentStatus: OrderStatus | PaymentStatus;
    mode?: "order" | "payment";
    isDisabled: boolean
}

export function OrderStatusActionsTable({ orderId, currentStatus, isDisabled, mode = "order" }: Props) {
    const { t } = useTranslation("order");
    const { mutate: updateStatus, isPending } = useUpdateOrderStatus(orderId);

    const isOrder = mode === "order";

    const CONFIG = isOrder ? ORDER_STATUS_CONFIG : PAYMENT_STATUS_CONFIG;
    const translationKey = isOrder ? "status" : "payments";
    const statusOptions = Object.keys(CONFIG) as (OrderStatus | PaymentStatus)[];

    const selectSx = {
        '& .MuiSelect-select': {
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            minHeight: 'unset'
        },
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid', borderColor: 'divider' },
        bgcolor: 'action.hover',
        borderRadius: 2,
        width: 'fit-content',
        minWidth: 140,
        ...(isDisabled && {
            pointerEvents: "none"
        })
    };

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
                "& .MuiFormControl-root": {
                    background: "transparent"
                }
            }}
        >
            <TextField
                select
                value={currentStatus}
                size="small"
                disabled={isPending}
                onChange={(e) =>
                    updateStatus(
                        isOrder
                            ? { status: e.target.value as OrderStatus }
                            : { payment_status: e.target.value as PaymentStatus }
                    )
                }
                sx={selectSx}
                slotProps={{
                    select: {
                        renderValue: (selected) => {
                            const statusKey = selected as keyof typeof CONFIG;
                            const color = CONFIG[statusKey]?.color || 'default';
                            return (
                                <Chip
                                    label={t(`${translationKey}.${selected}` as any)}
                                    size="small"
                                    color={color as any}
                                    sx={{ fontWeight: 'bold', height: 22, cursor: 'pointer' }}
                                />
                            );
                        }
                    }
                }}
            >
                {statusOptions.map((status) => (
                    <MenuItem key={status} value={status} sx={{ typography: 'body2' }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                mr: 1,
                                bgcolor: `${(CONFIG as any)[status].color}.main`
                            }}
                        />
                        {t(`${translationKey}.${status}` as any)}
                    </MenuItem>
                ))}
            </TextField>

            {isPending && <CircularProgress size={16} thickness={5} />}
        </Stack>
    );
}