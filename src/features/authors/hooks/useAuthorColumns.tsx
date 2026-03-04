import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { RouterLink } from '@/shared/components';
import { paths } from "@/shared/constants";
import { useLocalize } from '@/shared/lib';
import type { Column } from "@/shared/types";
import { fDate } from "@/shared/utilities";

import type { Author } from "../types";

export function useAuthorColumns(onDelete: (author: Author) => void) {
    const { t, getLocalizedValue } = useLocalize(["author", "common"]);
    const { hasPermission } = usePermission();
    const navigate = useNavigate();

    const canRead = hasPermission("author.read");
    const canUpdate = hasPermission("author.update");
    const canDelete = hasPermission("author.delete");

    return useMemo<Column<Author>[]>(() => [
        {
            id: "name",
            label: t("table.author"),
            render: (_, row) => (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        slotProps={{ img: { loading: 'lazy' } }}
                        src={row.image_url || ""}
                        alt={getLocalizedValue(row)}
                        variant="circular"
                        sx={{ flexShrink: 0, width: 45, height: 45, bgcolor: 'background.neutral' }}
                    >
                        {getLocalizedValue(row)?.[0]}
                    </Avatar>
                    <Stack spacing={0.1}>
                        <RouterLink
                            to={paths.dashboard.authors.details(row.id)}
                            text={getLocalizedValue(row)}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                            {row.slug}
                        </Typography>
                    </Stack>
                </Stack>
            ),
        },
        {
            id: "books_count",
            label: t("table.books"),
            align: "center",
            render: (books_count) => (
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                    <AutoStoriesIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {books_count || 0}
                    </Typography>
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
                    {canRead && (
                        <Tooltip title={t("common:actions.view")}>
                            <IconButton
                                onClick={() => navigate(paths.dashboard.authors.details(row.id))}
                                size="small"
                                color="primary"
                            >
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {canUpdate && (
                        <Tooltip title={t("common:actions.edit")}>
                            <IconButton
                                onClick={() => navigate(paths.dashboard.authors.edit(row.id))}
                                size="small"
                                color="warning"
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {canDelete && (
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
    ], [t, getLocalizedValue, canRead, canUpdate, canDelete, navigate, onDelete]);
}