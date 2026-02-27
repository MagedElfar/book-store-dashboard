import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Grid, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AreaChartFC, BarChartFC, PieChartFC, StatsBoard, type StatItem } from '@/shared/components';

import { AnalyticsChartCard } from '../components';
import { useSalesAnalytics, useCustomerComparison, useOrdersStatus } from '../hooks';

export default function OverviewSection({ params }: { params: any }) {
    const { t } = useTranslation(["analytics", "order"]);


    const { data: salesData, isLoading: salesLoading } = useSalesAnalytics(params);
    const { data: customers, isLoading: custLoading } = useCustomerComparison(params);
    const { data: statusData, isLoading: statusLoading } = useOrdersStatus(params)

    const totals = useMemo(() => {
        const revenue = salesData?.reduce((acc, curr) => acc + curr.total_revenue, 0) || 0;
        const pending = salesData?.reduce((acc, curr) => acc + curr.pending_revenue, 0) || 0;
        const orders = salesData?.reduce((acc, curr) => acc + curr.orders_count, 0) || 0;
        return { revenue, orders, pending };
    }, [salesData]);

    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalSales"),
            value: `$${totals.revenue.toLocaleString()}`,
            icon: <MonetizationOnIcon fontSize="large" />,
            color: 'primary',
            loading: salesLoading
        },
        {
            title: t("stats.pendingRevenue"),
            value: `$${totals.pending.toLocaleString()}`,
            icon: <HourglassEmptyIcon fontSize="large" />,
            color: 'warning',
            loading: salesLoading
        },
        {
            title: t("stats.activeOrders"),
            value: totals.orders,
            icon: <TrendingUpIcon fontSize="large" />,
            color: 'warning',
            loading: salesLoading
        }
    ], [t, totals.revenue, totals.pending, totals.orders, salesLoading]);

    const chartData = useMemo(() => {
        return statusData?.map(item => ({
            status: t(`order:status.${item.status_label}` as any),
            count: Number(item.orders_count)
        })) || [];
    }, [statusData, t]);

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
            <Stack direction="row" alignItems="center" spacing={1}>
                <DashboardCustomizeIcon color="primary" />
                <Typography color="primary" variant="subtitle1">
                    {t("tabs.overview")}
                </Typography>
            </Stack>

            <StatsBoard
                columns={{ xs: 12, sm: 6, md: 4 }}
                items={statsItems}
            />

            <Grid container spacing={3} sx={{ mt: 1 }}>
                {/* Sales Trend Chart */}
                <Grid size={{ xs: 12 }}>
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

                <Grid size={{ xs: 12, md: 8 }}>
                    <AnalyticsChartCard
                        title={t("charts.orderStatus")}
                        loading={statusLoading}
                    >
                        <BarChartFC
                            data={chartData}
                            xKey="status"
                            yKey="count"
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

