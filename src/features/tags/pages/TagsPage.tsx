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

// --- Local Components & Hooks ---
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

export default function TagsPage() {
    const { t, i18n } = useTranslation(["tag", "common"]);
    const isAr = i18n.language === "ar";

    const { hasPermission } = usePermission()
    // --- Pagination Hook ---
    const { page, limit, handleLimitChange, handlePageChange, setPage } = usePagination();

    // --- Local State ---
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [filters, setFilters] = useState<Omit<TagsParams, 'page' | 'limit'>>({
        search: "",
        is_active: "",
        sortBy: "newest"
    });

    // --- Data Fetching ---
    const { data: stats, isLoading: isLoadingStats } = useGetTagsStats();
    const { data, isLoading, isError, refetch } = useGetTags({
        limit,
        page: page + 1,
        ...filters
    });

    // --- Handlers ---
    const handleCloseAll = useCallback(() => {
        setSelectedTag(null);
        setIsDeleteMode(false);
        setIsCreateOpen(false);
    }, []);

    const handleFilterChange = useCallback((key: keyof TagsParams, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(0);
    }, [setPage]);

    const handleResetFilters = useCallback(() => {
        setFilters({ search: "", is_active: "", sortBy: "newest" });
        handlePageChange(null, 0);
    }, [handlePageChange]);

    // --- Memoized Columns ---
    const columns = useTagColumns({
        onEdit: (tag) => {
            setIsDeleteMode(false);
            setSelectedTag(tag);
        },
        onDelete: (tag) => {
            setIsDeleteMode(true);
            setSelectedTag(tag);
        }
    });

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
                        onClick={() => setIsCreateOpen(true)}
                        variant="contained"
                    >
                        {t("actions.createTag")}
                    </Button>}
                </>}
            />

            <StatsBoard items={statsItems} />

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

            {/* 1. Create Dialog */}
            <TagFormDialog
                open={isCreateOpen}
                onClose={handleCloseAll}
            />

            {/* 2. Edit Dialog */}
            <TagFormDialog
                open={Boolean(selectedTag) && !isDeleteMode}
                tag={selectedTag}
                onClose={handleCloseAll}
            />

            {/* 3. Delete Confirmation Dialog */}
            {selectedTag && isDeleteMode && (
                <DeleteTagDialog
                    open={isDeleteMode}
                    tagId={selectedTag.id}
                    tagName={isAr ? selectedTag.name_ar : selectedTag.name_en}
                    onClose={handleCloseAll}
                />
            )}
        </PageWrapper>
    );
}