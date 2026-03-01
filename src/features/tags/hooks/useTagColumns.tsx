import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";

import { usePermission } from "@/features/auth";
import { useLocalize } from "@/shared/lib";
import type { Column } from "@/shared/types";
import { fDate } from "@/shared/utilities";

import type { Tag } from "../types";

type TagAction = (tag: Tag) => void

export function useTagColumns(onEdit: TagAction, onDelete: TagAction) {
    const { t, getLocalizedValue } = useLocalize(["tag", "common"]);
    const { hasPermission } = usePermission();


    return useMemo<Column<Tag>[]>(() => [
        {
            id: "name",
            label: t("table.tag"),
            render: (_, row) => (
                <Stack spacing={0.1}>
                    <Typography variant="subtitle2" noWrap>
                        {getLocalizedValue(row)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }} noWrap>
                        #{row.slug}
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
                    {hasPermission("tag.update") && (
                        <Tooltip title={t("common:actions.edit")}>
                            <IconButton
                                onClick={() => onEdit(row)} // هنا بينادي على الـ Dialog
                                size="small"
                                color="warning"
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {hasPermission("tag.delete") && (
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
    ], [t, getLocalizedValue, hasPermission, onEdit, onDelete]);
}