import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PersonIcon from '@mui/icons-material/Person';
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

// --- Local Components & Hooks ---
import { DeleteAuthorDialog } from "../components";
import { useGetAuthors, useGetAuthorsStats, useAuthorColumns } from "../hooks";
import type { Author, AuthorsParams } from "../types";

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

export default function AuthorsPage() {
    const { t, i18n } = useTranslation(["author", "common"]);
    const navigate = useNavigate();

    const isAr = i18n.language === "ar";

    // --- Pagination Hook ---
    const { page, limit, handleLimitChange, handlePageChange, setPage } = usePagination();

    // --- Local State ---
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [filters, setFilters] = useState<Omit<AuthorsParams, 'page' | 'limit'>>({
        search: "",
        is_active: "",
        sortBy: "newest"
    });

    // --- Data Fetching ---
    const { data: stats, isLoading: isLoadingStats } = useGetAuthorsStats();
    const { data, isLoading, isError, refetch } = useGetAuthors({
        limit,
        page: page + 1,
        ...filters
    });

    // --- Memoized Columns ---
    const columns = useAuthorColumns(setSelectedAuthor);

    // --- Handlers ---
    const handleFilterChange = useCallback((key: keyof AuthorsParams, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPage(0);
    }, [setPage]);

    const handleResetFilters = useCallback(() => {
        setFilters({
            search: "",
            is_active: "",
            sortBy: "newest"
        });
        handlePageChange(null, 0);
    }, [handlePageChange]);

    // --- Memoized Stats Data ---
    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalAuthors"),
            value: stats?.total_authors || 0,
            icon: <PersonIcon fontSize="large" />,
            color: 'primary',
            loading: isLoadingStats
        },
        {
            title: t("status.active"),
            value: stats?.active_authors || 0,
            icon: <TaskAltIcon fontSize="large" />,
            color: 'success',
            loading: isLoadingStats
        },
        {
            title: t("status.inactive"),
            value: stats?.inactive_authors || 0,
            icon: <DoDisturbIcon fontSize="large" />,
            color: 'error',
            loading: isLoadingStats
        }
    ], [stats, isLoadingStats, t]);

    return (
        <PageWrapper>
            <RootPageTitle
                title={t("authors")}
                btnText={t("createAuthor")}
                onClick={() => navigate(paths.dashboard.authors.create)}
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

            {selectedAuthor && (
                <DeleteAuthorDialog
                    open={Boolean(selectedAuthor)}
                    authorId={selectedAuthor.id}
                    authorName={isAr ? selectedAuthor.name_ar : selectedAuthor?.name_en}
                    onClose={() => setSelectedAuthor(null)}
                />
            )}
        </PageWrapper>
    );
}