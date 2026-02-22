import BlockIcon from '@mui/icons-material/Block'; // 
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useAuthorAutoComplete } from '@/features/authors';
import { useCategoryAutoComplete } from '@/features/categories';
import { useTagsAutoComplete } from '@/features/tags';
import { DataFilterToolbar, DataTable, FilterAutocomplete, FilterSelect, PageWrapper, RootPageTitle, StatsBoard, type StatItem } from '@/shared/components';
import { paths } from '@/shared/constants';
import { useDialog, usePagination } from '@/shared/hooks';
import type { SupportedLang } from '@/shared/types';

import { DeleteBookDialog } from '../components';
import { useBookColumns, useGetBooks, useGetBooksStats } from '../hooks';
import type { Book, BookParams } from '../types';


const getStatusOptions = (t: any) => [
    { value: "", label: t("status.all") },
    { value: "active", label: t("status.active") },
    { value: "inactive", label: t("status.inactive") },
];

const getSortOptions = (t: any) => [
    { value: "newest", label: t("filter.newest") },
    { value: "oldest", label: t("filter.oldest") },
    { value: "alpha", label: t("filter.alphabetical") },
    { value: "price_high", label: t("filter.priceHigh") },
    { value: "price_low", label: t("filter.priceLow") },
];

const DEFAULT_FILTERS: Omit<BookParams, "page" | "limit"> = {
    search: "",
    is_active: "",
    category_id: "",
    author_id: "",
    sortBy: "newest"
};

export default function BooksPage() {

    const { t, i18n } = useTranslation(["book", "common"]);
    const navigate = useNavigate();

    const lang = i18n.language as SupportedLang

    // --- Pagination Hook ---
    const { page, limit, handleLimitChange, handlePageChange, setPage } = usePagination();

    // --- Local State ---
    const [filters, setFilters] = useState<Omit<BookParams, 'page' | 'limit'>>(DEFAULT_FILTERS);

    const {
        data: selectedBook,
        isDelete,
        openDelete,
        closeDialog,
    } = useDialog<Book>();


    const { data: stats, isLoading: isLoadingStats } = useGetBooksStats();
    const { data, isLoading, isError, refetch } = useGetBooks({
        limit,
        page: page + 1,
        ...filters
    });

    const {
        options: authorOptions,
        setSearch: setAuthorSearch,
        setIsAuthorsEnabled,
        ...authorsQuery
    } = useAuthorAutoComplete();

    const {
        options: categoryOptions,
        setIsCategoriesEnabled,
        setSearch: setCategorySearch,
        ...categoriesQuery
    } = useCategoryAutoComplete();

    const {
        options: tagsOptions,
        setIsTagsEnabled,
        setSearch: setTagSearch,
        ...tagsQuery
    } = useTagsAutoComplete();

    // --- Handlers ---
    const handleFilterChange = useCallback((key: keyof BookParams, value: any) => {
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
    const columns = useBookColumns(openDelete);

    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalBooks"),
            value: stats?.total_books || 0,
            growth: stats?.growth_percentage,
            icon: <MenuBookIcon fontSize="large" />,
            color: 'primary',
            loading: isLoadingStats
        },
        {
            title: t("status.active"),
            value: stats?.active_books || 0,
            icon: <TaskAltIcon fontSize="large" />,
            color: 'success',
            loading: isLoadingStats
        },
        {
            title: t("status.inactive"),
            value: stats?.inactive_books || 0,
            icon: <BlockIcon fontSize="large" />,
            color: 'error',
            loading: isLoadingStats
        },
        {
            title: t("stats.outOfStock"),
            value: stats?.out_of_stock || 0,
            icon: <WarningAmberIcon fontSize="large" />,
            color: 'error',
            loading: isLoadingStats
        },
        {
            title: t("stats.totalStock"),
            value: stats?.total_stock || 0,
            icon: <InventoryIcon fontSize="large" />,
            color: 'warning',
            loading: isLoadingStats
        }
    ], [stats, isLoadingStats, t]);

    return (
        <PageWrapper>
            <RootPageTitle
                title={t("titles.books")}
                btnText={t("actions.createBook")}
                onClick={() => navigate(paths.dashboard.books.create)}
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

                <FilterAutocomplete
                    label={t("filter.author")}
                    value={filters.author_id}
                    options={authorOptions}
                    onChange={(val) => handleFilterChange("author_id", val)}
                    onSearchChange={(s) => setAuthorSearch(s)}
                    loading={authorsQuery.isLoading}
                    onOpen={() => setIsAuthorsEnabled(true)}
                    fetchNextPage={authorsQuery.fetchNextPage}
                    isFetchingNextPage={authorsQuery.isFetchingNextPage}
                    hasNextPage={authorsQuery.hasNextPage}
                />

                <FilterAutocomplete
                    label={t("filter.category")}
                    value={filters.category_id}
                    options={categoryOptions}
                    onChange={(val) => handleFilterChange("category_id", val)}
                    onSearchChange={(s) => setCategorySearch(s)}
                    loading={categoriesQuery.isLoading}
                    onOpen={() => setIsCategoriesEnabled(true)}
                    fetchNextPage={categoriesQuery.fetchNextPage}
                    isFetchingNextPage={categoriesQuery.isFetchingNextPage}
                    hasNextPage={categoriesQuery.hasNextPage}
                />

                <FilterAutocomplete
                    label={t("filter.tag")}
                    value={filters.tagId}
                    options={tagsOptions}
                    onChange={(val) => handleFilterChange("tagId", val)}
                    onSearchChange={(s) => setTagSearch(s)}
                    loading={tagsQuery.isLoading}
                    onOpen={() => setIsTagsEnabled(true)}
                    fetchNextPage={tagsQuery.fetchNextPage}
                    isFetchingNextPage={tagsQuery.isFetchingNextPage}
                    hasNextPage={tagsQuery.hasNextPage}
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

            {selectedBook && isDelete && (
                <DeleteBookDialog
                    open
                    bookId={selectedBook.id}
                    bookTitle={selectedBook?.[`title_${lang}`]}
                    onClose={closeDialog}
                />
            )}
        </PageWrapper>
    )
}
