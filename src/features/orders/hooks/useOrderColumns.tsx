import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Chip,
    IconButton,
    Link,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { paths } from "@/shared/constants";
import type { Column, SupportedLang } from "@/shared/types";
import { fDate, formatPrice } from "@/shared/utilities";

import { OrderStatusActionsTable } from "../components";
import { PAYMENT_STATUS_CONFIG } from "../config";
import type { Order, PaymentStatus } from "../types";

export function useOrderColumns() {
    const { t, i18n } = useTranslation(["order", "common"]);
    const { hasPermission } = usePermission();
    const navigate = useNavigate();

    const lang = i18n.language as SupportedLang;

    return useMemo<Column<Order>[]>(() => [
        // Order Number & Customer
        {
            id: "order_number",
            label: t("table.order"),
            render: (_, row) => (
                <Stack spacing={0.5}>
                    <Link
                        component="a"
                        href={paths.dashboard.orders.details(row.id)}
                        target='_blank'
                        underline="hover"
                        fontSize="subtitle2"
                    >
                        <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                            #{row.order_number}
                        </Typography>

                    </Link>

                    <Typography variant="body2" fontWeight={600} noWrap>
                        {row.customer_name}
                    </Typography>
                </Stack>
            ),
        },

        // Date
        {
            id: "created_at",
            label: t("table.date"),
            render: (date) => (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {fDate(date as string)}
                </Typography>
            ),
        },

        // Total Amount
        {
            id: "total_amount",
            label: t("table.total"),
            render: (total) => (
                <Typography variant="subtitle2" fontWeight="bold">
                    {formatPrice(total as number, lang)}
                </Typography>
            ),
        },

        // Order Status
        {
            id: "status",
            label: t("table.status"),
            render: (_, row) => {
                return (
                    <OrderStatusActionsTable
                        orderId={row.id}
                        currentStatus={row.status}
                    />
                )
            },
        },

        // Payment Status
        {
            id: "payment_status",
            label: t("table.payment"),
            align: "center",
            render: (status) => (
                <Chip
                    label={t(`payments.${status}` as any)}
                    size="small"
                    variant="filled"
                    color={PAYMENT_STATUS_CONFIG?.[status as PaymentStatus]?.color}
                />
            ),
        },

        // Actions
        {
            id: "actions",
            label: t("common:actions.title"),
            align: "right",
            render: (_, row) => (
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    {hasPermission("order.read") && (
                        <Tooltip title={t("common:actions.view")}>
                            <IconButton
                                onClick={() => navigate(paths.dashboard.orders.details(row.id))}
                                size="small"
                                color="primary"
                            >
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            ),
        },
    ], [t, lang, hasPermission, navigate]);
}