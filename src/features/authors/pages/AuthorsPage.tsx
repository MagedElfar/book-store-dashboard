import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PersonIcon from '@mui/icons-material/Person';
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
    { value: "most_books", label: t("filter.most_books") },

];


const DEFAULT_FILTERS: Omit<AuthorsParams, "page" | "limit"> = {
    search: "",
    is_active: "",
    sortBy: "newest"
};

export default function AuthorsPage() {
    const { t, getLocalizedValue } = useLocalize(["author", "common"]);
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
        data: selectedAuthor,
        isDelete,
        openDelete,
        closeDialog,
    } = useDialog<Author>();

    // --- Data Fetching ---
    const { data: stats, isLoading: isLoadingStats } = useGetAuthorsStats();
    const { data, isLoading, isError, refetch } = useGetAuthors({
        limit,
        page: page + 1,
        ...filters
    });

    // --- Memoized Stats Data ---

    const columns = useAuthorColumns(openDelete);

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

    const statusOptions = useMemo(() => getStatusOptions(t), [t]);
    const sortOptions = useMemo(() => getSortOptions(t), [t])

    return (
        <PageWrapper>
            <RootPageTitle
                title={t("authors")}
                btnText={t("createAuthor")}
                onClick={() => navigate(paths.dashboard.authors.create)}
            />

            <StatsBoard
                columns={{ xs: 12, sm: 6, md: 4 }}
                items={statsItems}
            />

            <DataFilterToolbar
                searchValue={filters.search}
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

            {selectedAuthor && isDelete && (
                <DeleteAuthorDialog
                    open
                    authorId={selectedAuthor.id}
                    authorName={getLocalizedValue(selectedAuthor)}
                    onClose={closeDialog}
                />
            )}
        </PageWrapper>
    );
}