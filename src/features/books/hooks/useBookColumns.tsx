import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Avatar,
    Chip,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { PriceDisplay } from "@/shared/components";
import { paths } from "@/shared/constants";
import type { Column, SupportedLang } from "@/shared/types";
import { fDate } from "@/shared/utilities";

import type { Book } from "../types";

export function useBookColumns(onDelete: (book: Book) => void) {
    const { t, i18n } = useTranslation(["book", "common"]);
    const { hasPermission } = usePermission();
    const navigate = useNavigate();

    const lang = i18n.language as SupportedLang;



    return useMemo<Column<Book>[]>(() => [
        {
            id: "title_en",
            label: t("table.book"),
            render: (_, row) => (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        src={row.cover_image || ""}
                        alt={row.title_en}
                        variant="rounded"
                        sx={{ width: 45, height: 45, bgcolor: "background.neutral" }}
                    >
                        {row.title_en?.[0]}
                    </Avatar>

                    <Stack spacing={0.1}>
                        <Typography variant="subtitle2" noWrap>
                            {row?.[`title_${lang}`]}
                        </Typography>

                        <Typography variant="caption" sx={{ color: "text.secondary" }} noWrap>
                            {row.slug}
                        </Typography>
                    </Stack>
                </Stack>
            ),
        },

        // SKU
        {
            id: "sku",
            label: t("table.sku"),
            render: (sku) => (
                <Typography variant="body2" fontWeight={500}>
                    {sku}
                </Typography>
            ),
        },

        // Price
        {
            id: "price",
            label: t("table.price"),
            render: (_, row) => <PriceDisplay
                sale_price={row.sale_price}
                price={row.price}
            />
        },

        // Stock
        {
            id: "stock",
            label: t("table.stock"),
            align: "center",
            render: (stock) => (
                <Chip
                    label={stock}
                    size="small"
                    color={stock > 0 ? "success" : "error"}
                />
            ),
        },

        // Status
        {
            id: "is_active",
            label: t("table.status"),
            align: "center",
            render: (isActive) => (
                <Chip
                    label={isActive ? t("status.active") : t("status.inactive")}
                    size="small"
                    color={isActive ? "success" : "default"}
                />
            ),
        },

        // Created At
        {
            id: "created_at",
            label: t("table.createdAt"),
            render: (date) => (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {fDate(date as string)}
                </Typography>
            ),
        },

        // Actions
        {
            id: "actions",
            label: t("common:actions.title"),
            align: "right",
            render: (_, row) => (
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    {hasPermission("book.read") && (
                        <Tooltip title={t("common:actions.view")}>
                            <IconButton
                                onClick={() => navigate(paths.dashboard.books.details(row.id))}
                                size="small"
                                color="primary"
                            >
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    {hasPermission("book.update") && (
                        <Tooltip title={t("common:actions.edit")}>
                            <IconButton
                                onClick={() => navigate(paths.dashboard.books.edit(row.id))}
                                size="small"
                                color="warning"
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    {hasPermission("book.delete") && (
                        <Tooltip title={t("common:actions.delete")}>
                            <IconButton
                                onClick={() => onDelete(row)}
                                size="small"
                                color="error"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            ),
        },
    ], [t, lang, hasPermission, navigate, onDelete]);
}