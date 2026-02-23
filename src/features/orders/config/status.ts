import type { ChipProps } from '@mui/material';

import type { OrderStatus, PaymentStatus } from "../types";

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { color: ChipProps['color'] }> = {
    pending: { color: 'warning' },
    processing: { color: 'info' },
    shipped: { color: 'secondary' },
    completed: { color: 'success' },
    cancelled: { color: 'error' },
    returned: { color: 'default' },
};

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { color: ChipProps['color'] }> = {
    pending: { color: 'warning' },
    paid: { color: 'success' },
    failed: { color: 'error' },
    refunded: { color: 'info' },
};