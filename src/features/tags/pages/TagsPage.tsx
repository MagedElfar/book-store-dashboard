import AddIcon from '@mui/icons-material/Add';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import LabelIcon from '@mui/icons-material/Label';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

// --- Shared Components ---
import { usePermission } from "@/features/auth";
import {
    DataTable,
    DataFilterToolbar,
    FilterSelect,
    PageWrapper,
    PageTitle,
    type StatItem,
    StatsBoard,
} from "@/shared/components";
import { usePagination } from "@/shared/hooks";
import { useDialog } from '@/shared/hooks/useDialog';
import type { SupportedLang } from '@/shared/types';

import { DeleteTagDialog, TagFormDialog } from "../components";
import { useGetTags, useGetTagsStats, useTagColumns } from "../hooks";
import type { Tag, TagsParams } from "../types";

const getStatusOptions = (t: any) => [
    { value: "", label: t("status.all") },
    { value: "active", label: t("status.active") },
    { value: "inactive", label: t("status.inactive") },
];

const getSortOptions = (t: any) => [
    { value: "newest", label: t("filter.newest") },
    { value: "oldest", label: t("filter.oldest") },
    { value: "alpha", label: t("filter.alphabetical") },
];

const DEFAULT_FILTERS: Omit<TagsParams, "page" | "limit"> = {
    search: "",
    is_active: "",
    sortBy: "newest"
};

export default function TagsPage() {
    const { t, i18n } = useTranslation(["tag", "common"]);
    const lang = i18n.language as SupportedLang;

    const { hasPermission } = usePermission()
    // --- Pagination Hook ---
    const { page, limit, handleLimitChange, handlePageChange, setPage } = usePagination();

    // --- Local State ---
    const {
        data: selectedTag,
        isCreate,
        isEdit,
        isDelete,
        openCreate,
        openEdit,
        openDelete,
        closeDialog,
    } = useDialog<Tag>();

    const [filters, setFilters] = useState<Omit<TagsParams, 'page' | 'limit'>>(DEFAULT_FILTERS);

    // --- Data Fetching ---
    const { data: stats, isLoading: isLoadingStats } = useGetTagsStats();
    const { data, isLoading, isError, refetch } = useGetTags({
        limit,
        page: page + 1,
        ...filters
    });

    const handleFilterChange = useCallback((key: keyof TagsParams, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(0);
    }, [setPage]);

    const handleResetFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
        handlePageChange(null, 0);
    }, [handlePageChange]);

    // --- Memoized Columns ---
    const columns = useTagColumns(openEdit, openDelete);

    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalTags"),
            value: stats?.total_tags || 0,
            icon: <LabelIcon fontSize="large" />,
            color: 'primary',
            loading: isLoadingStats
        },
        {
            title: t("status.active"),
            value: stats?.active_tags || 0,
            icon: <TaskAltIcon fontSize="large" />,
            color: 'success',
            loading: isLoadingStats
        },
        {
            title: t("status.inactive"),
            value: stats?.inactive_tags || 0,
            icon: <DoDisturbIcon fontSize="large" />,
            color: 'error',
            loading: isLoadingStats
        }
    ], [stats, isLoadingStats, t]);

    return (
        <PageWrapper>
            {/* Page Header */}
            <PageTitle
                title={t("tags")}
                actions={<>
                    {hasPermission("tag.create") && <Button
                        startIcon={<AddIcon fontSize="small" />}
                        onClick={openCreate}
                        variant="contained"
                    >
                        {t("actions.createTag")}
                    </Button>}
                </>}
            />

            <StatsBoard
                columns={{ xs: 12, sm: 6, md: 4 }}
                items={statsItems}
            />

            {/* Filters Toolbar */}
            <DataFilterToolbar
                searchValue={filters.search || ""}
                searchPlaceholder={t("filter.searchPlaceholder")}
                onSearchChange={(val) => handleFilterChange("search", val)}
                onClear={handleResetFilters}
            >
                <FilterSelect
                    label={t("filter.status")}
                    value={filters.is_active || ""}
                    options={getStatusOptions(t)}
                    onChange={(val) => handleFilterChange("is_active", val)}
                />
                <FilterSelect
                    label={t("filter.sortBy")}
                    value={filters.sortBy || "newest"}
                    options={getSortOptions(t)}
                    onChange={(val) => handleFilterChange("sortBy", val)}
                />
            </DataFilterToolbar>

            {/* Data Table */}
            <DataTable
                rows={data?.items || []}
                columns={columns}
                count={data?.total || 0}
                page={page}
                limit={limit}
                isLoading={isLoading}
                isError={isError}
                onRefetch={refetch}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />

            {/* --- Dialogs Logic --- */}

            <TagFormDialog
                open={isCreate}
                onClose={closeDialog}
            />

            {isEdit && selectedTag && (
                <TagFormDialog
                    open
                    tag={selectedTag}
                    onClose={closeDialog}
                />
            )}

            {isDelete && selectedTag && (
                <DeleteTagDialog
                    open
                    tagId={selectedTag.id}
                    tagName={selectedTag[`name_${lang}`]}
                    onClose={closeDialog}
                />
            )}
        </PageWrapper>
    );
}