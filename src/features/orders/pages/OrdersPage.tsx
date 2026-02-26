import AnalyticsIcon from '@mui/icons-material/Analytics';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { DataFilterToolbar, DataTable, FilterDateRange, FilterSelect, PageWrapper, RootPageTitle, StatsBoard, type StatItem } from '@/shared/components';
import { paths } from '@/shared/constants';
import { usePagination } from '@/shared/hooks';
import type { SupportedLang } from '@/shared/types';
import { formatPrice } from '@/shared/utilities';

import { ORDER_STATUS_CONFIG } from '../config';
import { useGetOrders, useGetOrdersStats, useOrderColumns } from '../hooks';
import type { OrderParams } from '../types';

const getStatusOptions = (t: any) => [
    { value: "all", label: t("status.all") },
    ...Object.keys(ORDER_STATUS_CONFIG)
        .map(key => ({ value: key, label: t(`status.${key}`) }))
];

const getOrderSortOptions = (t: any) => [
    { value: "newest", label: t("filters.newest") },
    { value: "oldest", label: t("filters.oldest") },
    { value: "total_desc", label: t("filters.total_desc") },
    { value: "total_asc", label: t("filters.total_asc") },
    { value: "status", label: t("filters.status") },
];

const DEFAULT_FILTERS: Omit<OrderParams, "page" | "limit"> = {
    search: "",
    status: "all",
    startDate: "",
    endDate: "",
    sortBy: "newest",
};

export default function OrdersPage() {

    const { t, i18n } = useTranslation(["order", "common"]);
    const navigate = useNavigate();

    const lang = i18n.language as SupportedLang

    // --- Pagination Hook ---
    const { page, limit, handleLimitChange, handlePageChange, setPage } = usePagination();

    // --- Local State ---
    const [filters, setFilters] = useState<Omit<OrderParams, 'page' | 'limit'>>(DEFAULT_FILTERS);

    const { data: stats, isLoading: isLoadingStats } = useGetOrdersStats();
    const { data, isLoading, isError, refetch } = useGetOrders({
        limit,
        page: page + 1,
        ...filters
    });

    // --- Handlers ---
    const handleFilterChange = useCallback((key: keyof OrderParams, value: any) => {
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


    const averageOrderValue = Number(stats?.total_orders) > 0
        ? Math.round((stats?.total_revenue || 0) / (stats?.total_orders || 0))
        : 0

    const columns = useOrderColumns();
    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalOrders"),
            value: stats?.total_orders || 0,
            growth: stats?.growth_percentage,
            icon: <ShoppingCartIcon fontSize="large" />,
            color: 'primary',
            loading: isLoadingStats
        },
        {
            title: t("stats.totalRevenue"),
            value: formatPrice(stats?.total_revenue || 0, lang),
            isCurrency: true,
            icon: <PaidIcon fontSize="large" />,
            color: 'success',
            loading: isLoadingStats
        },
        {
            title: t("stats.averageOrderValue"),
            value: formatPrice(averageOrderValue, lang),
            isCurrency: true,
            icon: <AnalyticsIcon fontSize="large" />,
            color: 'secondary',
            loading: isLoadingStats
        },
        {
            title: t("status.pending"),
            value: stats?.pending_orders || 0,
            icon: <PendingActionsIcon fontSize="large" />,
            color: 'warning',
            loading: isLoadingStats
        },
        {
            title: t("status.shipped"),
            value: stats?.shipped_orders || 0,
            icon: <LocalShippingIcon fontSize="large" />,
            color: 'info',
            loading: isLoadingStats
        },
        {
            title: t("status.completed"),
            value: stats?.completed_orders || 0,
            icon: <CheckCircleIcon fontSize="large" />,
            color: 'success',
            loading: isLoadingStats
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [stats, isLoadingStats, t]);

    return (
        <PageWrapper>
            <RootPageTitle
                title={t("orders")}
                btnText={t("actions.createOrder")}
                onClick={() => navigate(paths.dashboard.orders.create)}
            />

            <StatsBoard
                columns={{ xs: 12, sm: 6, md: 4 }}
                items={statsItems}
            />

            <DataFilterToolbar
                searchValue={filters.search || ""}
                searchPlaceholder={t("filters.search")}
                onSearchChange={(val) => handleFilterChange("search", val)}
                onClear={handleResetFilters}
            >
                <FilterSelect
                    label={t("filters.status")}
                    value={filters.status || "all"}
                    options={getStatusOptions(t)}
                    onChange={(val) => handleFilterChange("status", val)}
                />

                <FilterSelect
                    label={t("filters.sortBy")}
                    value={filters.sortBy || "newest"}
                    options={getOrderSortOptions(t)}
                    onChange={(val) => handleFilterChange("sortBy", val)}
                />

                <FilterDateRange
                    startDate={filters.startDate || null}
                    endDate={filters.endDate || null}
                    labels={{ start: t("filters.startDate"), end: t("filters.endDate") }}
                    onDateChange={(start, end) => {
                        handleFilterChange("startDate", start);
                        handleFilterChange("endDate", end);
                    }}
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

        </PageWrapper>
    )
}
