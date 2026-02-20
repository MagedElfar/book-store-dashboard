import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { paths } from "@/shared/constants";
import type { Column } from "@/shared/types";
import { fDate } from "@/shared/utilities";

import type { User } from "../types";


export function useUserColumns(onDelete: (user: User) => void) {
    const { t } = useTranslation(["user", "common"]);
    const { hasPermission } = usePermission()
    const navigate = useNavigate()

    return useMemo<Column<User>[]>(() => [
        {
            id: "avatar_url",
            label: t("table.user"), // "User"
            render: (url, row) => (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        src={url as string}
                        alt={row.full_name}
                        sx={{ width: 40, height: 40, textTransform: "uppercase" }}
                    >
                        <Typography textTransform="uppercase" variant="body2">{row.full_name?.[0]}</Typography>
                    </Avatar>
                    <Stack spacing={0.1}>
                        <Typography textTransform="capitalize" variant="subtitle2" noWrap>
                            {row.full_name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                            {row.email}
                        </Typography>
                    </Stack>
                </Stack>
            ),
        },
        {
            id: "role",
            label: t("table.role"),
            align: "center",
            render: (role) => {
                const colors: Record<string, "error" | "info" | "success" | "default"> = {
                    admin: "error",
                    support: "info",
                    user: "success",
                };
                return (
                    <Chip
                        label={t(`role.${role}` as any)}
                        size="small"
                        color={colors[role as string] || "default"}
                        variant="filled"
                    />
                );
            },
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
                        hasPermission("user.read") && <Tooltip title={t("common:actions.view")}>
                            <IconButton onClick={() => navigate(paths.dashboard.users.details(row.id))} size="small" color="primary">
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        hasPermission("user.update") && <Tooltip title={t("common:actions.edit")}>
                            <IconButton onClick={() => navigate(paths.dashboard.users.edit(row.id))} size="small" color="warning">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        hasPermission("user.delete") && <Tooltip title={t("common:actions.delete")}>
                            <IconButton
                                onClick={() => onDelete(row)}
                                size="small"
                                color="error"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }


                </Stack>
            ),
        },
    ], [navigate, hasPermission, onDelete, t]);
}