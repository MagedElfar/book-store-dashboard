import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { paths } from "@/shared/constants";
import type { Column, SupportedLang } from "@/shared/types";
import { fDate } from "@/shared/utilities";

import type { Author } from "../types";

export function useAuthorColumns(onDelete: (author: Author) => void) {
    const { t, i18n } = useTranslation(["author", "common"]);
    const { hasPermission } = usePermission();
    const navigate = useNavigate();

    const lang = i18n.language as SupportedLang;

    return useMemo<Column<Author>[]>(() => [
        {
            id: "name_en",
            label: t("table.author"),
            render: (_, row) => (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        src={row.image_url || ""}
                        alt={row.name_en}
                        variant="circular"
                        sx={{ width: 45, height: 45, bgcolor: 'background.neutral' }}
                    >
                        {row.name_en?.[0]}
                    </Avatar>
                    <Stack spacing={0.1}>
                        <Typography variant="subtitle2" noWrap>
                            {row?.[`name_${lang}`]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                            {row.slug}
                        </Typography>
                    </Stack>
                </Stack>
            ),
        },
        {
            id: "booksCount",
            label: t("table.books"),
            align: "center",
            render: (booksCount) => (
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                    <AutoStoriesIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {booksCount || 0}
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
                    {hasPermission("author.read") && (
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
                    {hasPermission("author.update") && (
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
                    {hasPermission("author.delete") && (
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