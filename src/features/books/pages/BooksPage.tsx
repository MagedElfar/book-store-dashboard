import BlockIcon from '@mui/icons-material/Block'; // 
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { useAuthorAutoComplete } from '@/features/authors';
import { useCategoryAutoComplete } from '@/features/categories';
import { useTagsAutoComplete } from '@/features/tags';
import { DataFilterToolbar, DataTable, FilterAutocomplete, FilterSelect, PageWrapper, RootPageTitle, StatsBoard, type StatItem } from '@/shared/components';
import { paths } from '@/shared/constants';
import { useDialog, useQueryFilters } from '@/shared/hooks';
import { useLocalize } from '@/shared/lib';

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
    { value: "stock_high", label: t("filter.stockHigh") },
    { value: "stock_low", label: t("filter.stockLow") },
];

const DEFAULT_FILTERS: BookParams = {
    search: "",
    is_active: "",
    category_id: "",
    author_id: "",
    tagId: "",
    sortBy: "newest",
};

export default function BooksPage() {

    const { t, getLocalizedValue } = useLocalize(["book", "common"]);
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
        data: selectedBook,
        isDelete,
        openDelete,
        closeDialog,
    } = useDialog<Book>();


    const { data: stats, isLoading: isLoadingStats } = useGetBooksStats();
    const { data, isLoading, isError, refetch } = useGetBooks({
        ...filters,
        page: page + 1,
        limit
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

    const statusOptions = useMemo(() => getStatusOptions(t), [t])
    const sortOptions = useMemo(() => getSortOptions(t), [t])

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
                searchValue={filters.search}
                searchPlaceholder={t("filter.searchPlaceholder")}
                onSearchChange={handleFilterChange}
                onClear={handleResetFilters}
                keySearch="search"
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

                <FilterAutocomplete
                    label={t("filter.author")}
                    value={filters.author_id}
                    options={authorOptions}
                    onSearchChange={setAuthorSearch}
                    loading={authorsQuery.isLoading}
                    onOpen={setIsAuthorsEnabled}
                    fetchNextPage={authorsQuery.fetchNextPage}
                    isFetchingNextPage={authorsQuery.isFetchingNextPage}
                    hasNextPage={authorsQuery.hasNextPage}
                    onChange={handleFilterChange}
                    filterKey="author_id"
                />

                <FilterAutocomplete
                    label={t("filter.category")}
                    value={filters.category_id}
                    options={categoryOptions}
                    onSearchChange={setCategorySearch}
                    loading={categoriesQuery.isLoading}
                    onOpen={setIsCategoriesEnabled}
                    fetchNextPage={categoriesQuery.fetchNextPage}
                    isFetchingNextPage={categoriesQuery.isFetchingNextPage}
                    hasNextPage={categoriesQuery.hasNextPage}
                    onChange={handleFilterChange}
                    filterKey="category_id"
                />

                <FilterAutocomplete
                    label={t("filter.tag")}
                    value={filters.tagId}
                    options={tagsOptions}
                    onSearchChange={setTagSearch}
                    loading={tagsQuery.isLoading}
                    onOpen={setIsTagsEnabled}
                    fetchNextPage={tagsQuery.fetchNextPage}
                    isFetchingNextPage={tagsQuery.isFetchingNextPage}
                    hasNextPage={tagsQuery.hasNextPage}
                    onChange={handleFilterChange}
                    filterKey="tagId"
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
                    bookTitle={getLocalizedValue(selectedBook, "title", "title_en")}
                    onClose={closeDialog}
                />
            )}
        </PageWrapper>
    )
}
