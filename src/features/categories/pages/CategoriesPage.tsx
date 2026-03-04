import CategoryIcon from '@mui/icons-material/Category';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useMemo } from "react";
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
import { useQueryFilters } from "@/shared/hooks";
import { useDialog } from '@/shared/hooks/useDialog';
import { useLocalize } from '@/shared/lib';

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
    const { t, getLocalizedValue } = useLocalize(["category", "common"])
    const navigate = useNavigate();


    const {
        filters,
        handleFilterChange,
        handleResetFilters,
        handleLimitChange,
        handlePageChange,
        page,
        limit
    } = useQueryFilters(DEFAULT_FILTERS);

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

    const statusOptions = useMemo(() => getStatusOptions(t), [t])
    const sortOptions = useMemo(() => getSortOptions(t), [t])

    return (
        <PageWrapper>
            <RootPageTitle
                title={t("categories")}
                btnText={t("createCategory")}
                onClick={() => navigate(paths.dashboard.categories.create)}
            />

            <StatsBoard
                columns={{ xs: 12, sm: 6, md: 4 }}
                items={statsItems}
            />

            <DataFilterToolbar
                searchValue={filters.search || ""}
                searchPlaceholder={t("filter.searchPlaceholder")}
                onSearchChange={handleFilterChange}
                onClear={handleResetFilters}
            >
                <FilterSelect
                    label={t("filter.status")}
                    value={filters.is_active || ""}
                    options={statusOptions}
                    onChange={handleFilterChange}
                    inputKey="is_active"
                />
                <FilterSelect
                    label={t("filter.sortBy")}
                    value={filters.sortBy || "newest"}
                    options={sortOptions}
                    onChange={handleFilterChange}
                    inputKey="sortBy"
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
                    categoryName={getLocalizedValue(selectedCategory, "name", "name_en")}
                    onClose={closeDialog}
                />
            )}
        </PageWrapper>
    );
}