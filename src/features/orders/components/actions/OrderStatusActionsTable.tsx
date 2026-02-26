import { Stack, TextField, Chip, MenuItem, Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ORDER_STATUS_CONFIG } from "../../config";
import { useUpdateOrderStatus } from "../../hooks";
import type { OrderStatus } from "../../types";

interface Props {
    orderId: string;
    currentStatus: OrderStatus
}

export function OrderStatusActionsTable({ orderId, currentStatus }: Props) {
    const { t } = useTranslation("order");
    const { mutate: updateStatus, isPending } = useUpdateOrderStatus(orderId);

    const selectSx = {
        '& .MuiSelect-select': {
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            minHeight: 'unset'
        },
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // إخفاء الحدود لتبدو كـ Chip
        '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid', borderColor: 'divider' },
        bgcolor: 'action.hover',
        borderRadius: 2,
        width: 'fit-content',
        minWidth: 130
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
                onChange={(e) => updateStatus({ status: e.target.value as OrderStatus })}
                sx={selectSx}
                slotProps={{
                    select: {
                        renderValue: (selected) => (
                            <Chip
                                label={t(`status.${selected}` as any)}
                                size="small"
                                color={ORDER_STATUS_CONFIG[selected as OrderStatus].color}
                                sx={{ fontWeight: 'bold', height: 22, cursor: 'pointer' }}
                            />
                        )
                    }
                }}
            >
                {(Object.keys(ORDER_STATUS_CONFIG) as OrderStatus[]).map((status) => (
                    <MenuItem key={status} value={status} sx={{ typography: 'body2' }}>
                        <Box
                            sx={{
                                width: 8, height: 8, borderRadius: '50%', mr: 1,
                                bgcolor: `${ORDER_STATUS_CONFIG[status].color}.main`
                            }}
                        />
                        {t(`status.${status}`)}
                    </MenuItem>
                ))}
            </TextField>

            {isPending && <CircularProgress size={16} thickness={5} />}
        </Stack>
    );
}