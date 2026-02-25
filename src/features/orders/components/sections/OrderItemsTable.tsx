import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {

    Avatar, Typography, Stack, Box,
    Chip,
    Card,
    CardContent,
    Button
} from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { usePermission } from '@/features/auth';
import { DataTable } from '@/shared/components';
import { useDialog } from '@/shared/hooks';
import type { Column, SupportedLang } from "@/shared/types";
import { formatPrice } from "@/shared/utilities";

import type { OrderItem, OrderStatus } from "../../types";
import { OrderItemsFormDialog } from '../actions';

interface Props {
    orderId: string
    items: OrderItem[];
    status: OrderStatus
}

export function OrderItemsTable({ items, orderId, status }: Props) {
    const { t, i18n } = useTranslation(["order", "common"]);
    const lang = i18n.language as SupportedLang

    const { data: orderItems, isEdit, openEdit, closeDialog } = useDialog<OrderItem[]>();

    const { hasPermission } = usePermission()
    const allowedStatus: OrderStatus[] = ["pending", "processing"]

    const isEditAble = hasPermission("order.manage") && allowedStatus.includes(status)

    const columns = useMemo<Column<OrderItem>[]>(() => [
        {
            id: "book",
            label: t("itemsTable.book"),
            render: (_, row) => (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        src={row.book?.cover_image || ""}
                        alt={row.book?.title_en}
                        variant="rounded"
                        sx={{ width: 45, height: 60, bgcolor: "background.neutral" }}
                    >
                        {row.book?.title_en?.[0]}
                    </Avatar>

                    <Stack spacing={0.1}>
                        <Typography variant="subtitle2" noWrap sx={{ maxWidth: 250 }}>
                            {row.book?.[`title_${lang}`]}
                        </Typography>

                        <Typography variant="caption" sx={{ color: "text.secondary" }} noWrap>
                            ID: {row.book_id.split('-')[0]}
                        </Typography>
                    </Stack>
                </Stack>
            ),
        },

        {
            id: "price_at_purchase",
            label: t("itemsTable.price"),
            align: "center",
            render: (price) => (
                <Typography variant="body2" fontWeight={500}>
                    {formatPrice(price, lang)}
                </Typography>
            ),
        },

        {
            id: "quantity",
            label: t("itemsTable.quantity"),
            align: "center",
            render: (qty) => (
                <Chip
                    label={`× ${qty}`}
                    size="small"
                    color="info"
                    sx={{ fontWeight: 'bold' }}
                />
            ),
        },

        {
            id: "total",
            label: t("itemsTable.total"),
            align: "right",
            render: (_, row) => (
                <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 700 }}>
                    {formatPrice(row.price_at_purchase * row.quantity, lang)}
                </Typography>
            ),
        },
    ], [t, lang]);

    return <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1.5} color="primary.main">
                        <Box sx={{ bgcolor: 'primary.lighter', p: 0.8, borderRadius: 1.5, display: 'flex' }}>
                            <ListAltIcon fontSize="small" />
                        </Box>
                        <Typography variant="subtitle1" fontWeight="700">
                            {t("orderItems")}
                        </Typography>
                    </Stack>

                    {isEditAble && <Button
                        color="warning"
                        onClick={() => openEdit(items)}
                        size="small"
                        startIcon={<EditIcon fontSize="small" />}
                    >
                        {t("common:actions.edit")}
                    </Button>}
                </Stack>

                <DataTable
                    rows={items}
                    columns={columns}
                    count={items?.length || 0}
                />
            </Stack>
        </CardContent>

        {orderItems && <OrderItemsFormDialog
            open={isEdit}
            onClose={closeDialog}
            orderId={orderId}
            items={orderItems}
        />}
    </Card>
}