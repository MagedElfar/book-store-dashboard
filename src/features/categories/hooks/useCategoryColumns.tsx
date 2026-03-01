import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Chip, IconButton, Link, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { paths } from "@/shared/constants";
import { useLocalize } from "@/shared/lib";
import type { Column } from "@/shared/types";
import { fDate } from "@/shared/utilities";

import type { Category } from "../types";

export function useCategoryColumns(onDelete: (category: Category) => void) {
    const { t, getLocalizedValue } = useLocalize(["category", "common"]);
    const { hasPermission } = usePermission();
    const navigate = useNavigate();

    return useMemo<Column<Category>[]>(() => [
        {
            id: "name",
            label: t("table.category"),
            render: (_, row) => (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        src={row.image_url || ""}
                        alt={getLocalizedValue(row)}
                        variant="rounded"
                        sx={{ width: 45, height: 45, bgcolor: 'background.neutral' }}
                    >
                        {getLocalizedValue(row)?.[0]}
                    </Avatar>
                    <Stack spacing={0.1}>
                        <Link
                            component="a"
                            href={paths.dashboard.categories.details(row.id)}
                            rel="noopener"
                            target='_blank'
                            underline="hover"
                            fontSize="subtitle2"
                        >

                            <Typography variant="subtitle2" noWrap>
                                {getLocalizedValue(row)}
                            </Typography>

                        </Link>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                            {row.slug}
                        </Typography>
                    </Stack>
                </Stack>
            ),
        },
        {
            id: "is_active",
            label: t("table.status"),
            align: "center",
            render: (isActive) => (
                <Chip
                    label={isActive ? t("status.active") : t("status.inactive")}
                    size="small"
                    color={(isActive as boolean) ? "success" : "default"}
                    variant="filled"
                />
            ),
        },
        {
            id: "created_at",
            label: t("table.createdAt"),
            render: (date) => (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {fDate(date as string)}
                </Typography>
            ),
        },
        {
            id: "actions",
            label: t("common:actions.title"),
            align: "right",
            render: (_, row) => (
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    {
                        hasPermission("category.read") && <Tooltip title={t("common:actions.view")}>
                            <IconButton onClick={() => navigate(paths.dashboard.categories.details(row.id))} size="small" color="primary">
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }
                    {hasPermission("category.update") && (
                        <Tooltip title={t("common:actions.edit")}>
                            <IconButton
                                onClick={() => navigate(paths.dashboard.categories.edit(row.id))}
                                size="small"
                                color="warning"
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {hasPermission("category.delete") && (
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
    ], [t, getLocalizedValue, hasPermission, navigate, onDelete]);
}