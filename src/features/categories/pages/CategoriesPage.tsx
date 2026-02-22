import CategoryIcon from '@mui/icons-material/Category';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

// --- Shared Components ---
import {
    RootPageTitle,
    DataTable,
    DataFilterToolbar,
    FilterSelect,
    PageWrapper,
    StatsBoard,
    type StatItem
} from "@/shared/components";
import { paths } from "@/shared/constants";
import { usePagination } from "@/shared/hooks";
import { useDialog } from '@/shared/hooks/useDialog';
import type { SupportedLang } from '@/shared/types';

import { DeleteCategoryDialog } from "../components";
import { useGetCategories, useGetCategoriesStats, useCategoryColumns } from "../hooks";
import type { Category, CategoriesParams } from "../types";

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

const DEFAULT_FILTERS: Omit<CategoriesParams, "page" | "limit"> = {
    search: "",
    is_active: "",
    sortBy: "newest"
};

export default function CategoriesPage() {
    const { t, i18n } = useTranslation(["category", "common"]);
    const navigate = useNavigate();

    const lang = i18n.language as SupportedLang

    // --- Pagination Hook ---
    const { page, limit, handleLimitChange, handlePageChange, setPage } = usePagination();

    // --- Local State ---
    const [filters, setFilters] = useState<Omit<CategoriesParams, 'page' | 'limit'>>(DEFAULT_FILTERS);

    const {
        data: selectedCategory,
        isDelete,
        openDelete,
        closeDialog,
    } = useDialog<Category>();

    // --- Data Fetching ---
    const { data: stats, isLoading: isLoadingStats } = useGetCategoriesStats();
    const { data, isLoading, isError, refetch } = useGetCategories({
        limit,
        page: page + 1,
        ...filters
    });

    // --- Handlers ---
    const handleFilterChange = useCallback((key: keyof CategoriesParams, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPage(0);
    }, [setPage]);

    const handleResetFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS)
        handlePageChange(null, 0);
    }, [handlePageChange]);

    // --- Memoized Columns ---
    const columns = useCategoryColumns(openDelete);

    // --- Memoized Stats Data ---
    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalCategories"),
            value: stats?.total_categories || 0,
            icon: <CategoryIcon fontSize="large" />,
            color: 'primary',
            loading: isLoadingStats
        },
        {
            title: t("status.active"),
            value: stats?.active_categories || 0,
            icon: <TaskAltIcon fontSize="large" />,
            color: 'success',
            loading: isLoadingStats
        },
        {
            title: t("status.inactive"),
            value: stats?.inactive_categories || 0,
            icon: <DoDisturbIcon fontSize="large" />,
            color: 'error',
            loading: isLoadingStats
        }
    ], [stats, isLoadingStats, t]);

    return (
        <PageWrapper>
            <RootPageTitle
                title={t("categories")}
                btnText={t("createCategory")}
                onClick={() => navigate(paths.dashboard.categories.create)}
            />

            <StatsBoard
                items={statsItems}
            />

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

            {selectedCategory && isDelete && (
                <DeleteCategoryDialog
                    open
                    categoryId={selectedCategory.id}
                    categoryName={selectedCategory?.[`name_${lang}`]}
                    onClose={closeDialog}
                />
            )}
        </PageWrapper>
    );
}