import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Grid, Box, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AreaChartFC, PieChartFC, StatsBoard, type StatItem } from '@/shared/components';

import { AnalyticsChartCard } from '../components';
import { useSalesAnalytics, useUserGrowth, useCustomerComparison, useInventoryStatus } from '../hooks';

export default function OverviewSection({ params }: { params: any }) {
    const { t } = useTranslation("analytics");


    const { data: salesData, isLoading: salesLoading } = useSalesAnalytics(params);
    const { data: userGrowth, isLoading: userLoading } = useUserGrowth(params);
    const { data: customers, isLoading: custLoading } = useCustomerComparison(params);
    const { data: inventory, isLoading: invLoading } = useInventoryStatus();

    const totals = useMemo(() => {
        const revenue = salesData?.reduce((acc, curr) => acc + curr.total_revenue, 0) || 0;
        const orders = salesData?.reduce((acc, curr) => acc + curr.orders_count, 0) || 0;
        const users = userGrowth?.reduce((acc, curr) => acc + curr.new_users_count, 0) || 0;
        const totalStock = inventory?.reduce((acc, curr) => acc + curr.books_count, 0) || 0;

        return { revenue, orders, users, totalStock };
    }, [salesData, userGrowth, inventory]);

    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalSales"),
            value: `$${totals.revenue.toLocaleString()}`,
            icon: <MonetizationOnIcon fontSize="large" />,
            color: 'primary',
            loading: salesLoading
        },
        {
            title: t("stats.newUsers"),
            value: totals.users,
            icon: <PeopleIcon fontSize="large" />,
            color: 'info',
            loading: userLoading
        },
        {
            title: t("stats.inventoryItems"),
            value: totals.totalStock,
            icon: <InventoryIcon fontSize="large" />,
            color: 'success',
            loading: invLoading
        },
        {
            title: t("stats.activeOrders"),
            value: totals.orders,
            icon: <TrendingUpIcon fontSize="large" />,
            color: 'warning',
            loading: salesLoading
        }
    ], [t, totals.revenue, totals.users, totals.totalStock, totals.orders, salesLoading, userLoading, invLoading]);

    const salesChartData = useMemo(() =>
        salesData?.map(item => ({
            name: item.period_date,
            value: item.total_revenue
        })) || [], [salesData]);

    const customerChartData = useMemo(() =>
        customers?.map(item => ({
            name: item.customer_type,
            value: item.total_spent
        })) || [], [customers]);

    return (
        <Stack spacing={3}>
            {/* Stats Board */}
            <StatsBoard items={statsItems} />

            <Grid container spacing={3} sx={{ mt: 1 }}>
                {/* Sales Trend Chart */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <AnalyticsChartCard
                        title={t("charts.salesTrend")}
                        loading={salesLoading}
                    >
                        <AreaChartFC
                            data={salesChartData}
                            xKey="name"
                            yKey="value"
                        />
                    </AnalyticsChartCard>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <AnalyticsChartCard
                        title={t("charts.customerTypes")}
                        loading={custLoading}
                    >
                        <PieChartFC
                            data={customerChartData}
                        />
                    </AnalyticsChartCard>
                </Grid>
            </Grid>
        </Stack>
    );
};

