import BarChartIcon from '@mui/icons-material/BarChart';
import InventoryIcon from '@mui/icons-material/Inventory';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarIcon from '@mui/icons-material/Star';
import { Grid, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { BarChartFC, StatsBoard, type StatItem } from '@/shared/components';
import type { SupportedLang } from '@/shared/types';

import { AnalyticsChartCard } from '../components';
import { useTopBooks, useInventoryStatus } from '../hooks';

export default function BooksSection({ params }: { params: any }) {
    const { t, i18n } = useTranslation("analytics");
    const lang = i18n.language as SupportedLang

    const { data: topBooks, isLoading: booksLoading } = useTopBooks({ ...params, limit: 5 });
    const { data: inventory, isLoading: invLoading } = useInventoryStatus();

    const statsItems: StatItem[] = useMemo(() => {
        const totalUnitsSold = topBooks?.reduce((acc, curr) => acc + curr.units_sold, 0) || 0;
        const totalRevenue = topBooks?.reduce((acc, curr) => acc + curr.revenue, 0) || 0;
        const outOfStockCount = inventory?.find(i => i.status_label === 'Out of Stock')?.books_count || 0;
        const totalStocks = inventory?.reduce((acc, curr) => acc + curr.books_count, 0) || 0;


        return [
            {
                title: t("stats.totalBooksSold"),
                value: totalUnitsSold.toLocaleString(),
                icon: <MenuBookIcon fontSize="large" />,
                color: 'primary',
                loading: booksLoading
            },
            {
                title: t("stats.topBooksRevenue"),
                value: `$${totalRevenue.toLocaleString()}`,
                icon: <StarIcon fontSize="large" />,
                color: 'warning',
                loading: booksLoading
            },
            {
                title: t("stats.outOfStock"),
                value: outOfStockCount,
                icon: <Inventory2Icon fontSize="large" />,
                color: 'error',
                loading: invLoading
            },
            {
                title: t("stats.avgPrice"),
                value: `$${totalUnitsSold > 0 ? (totalRevenue / totalUnitsSold).toFixed(2) : 0}`,
                icon: <BarChartIcon fontSize="large" />,
                color: 'info',
                loading: booksLoading
            },
            {
                title: t("stats.inventoryItems"),
                value: totalStocks,
                icon: <InventoryIcon fontSize="large" />,
                color: 'success',
                loading: invLoading
            },
        ];
    }, [topBooks, inventory, booksLoading, invLoading, t]);

    const topBooksData = useMemo(() =>
        topBooks?.map(book => ({
            name: book?.[`title_${lang}`]?.length > 15 ? book?.[`title_${lang}`].substring(0, 15) + '...' : book?.[`title_${lang}`],
            sales: book.units_sold,
            revenue: book.revenue
        })) || [], [lang, topBooks]);

    const inventoryData = useMemo(() =>
        inventory?.map(item => ({
            label: item.status_label,
            count: item.books_count
        })) || [], [inventory]);

    return (
        <Stack spacing={3} >

            <Stack direction="row" alignItems="center" spacing={1}>
                <InventoryIcon color="primary" />
                <Typography color="primary" variant="subtitle1">
                    {t("tabs.inventory")}
                </Typography>
            </Stack>

            <StatsBoard
                columns={{ xs: 12, sm: 4, md: 4 }}
                items={statsItems}
            />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <AnalyticsChartCard
                        title={t("charts.topSellingBooks")}
                        loading={booksLoading}
                    >
                        <BarChartFC
                            data={topBooksData}
                            xKey="name"
                            yKey="sales"
                        />
                    </AnalyticsChartCard>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <AnalyticsChartCard
                        title={t("charts.inventoryStatus")}
                        loading={invLoading}
                    >
                        <BarChartFC
                            data={inventoryData}
                            xKey="label"
                            yKey="count"
                        />
                    </AnalyticsChartCard>
                </Grid>
            </Grid>
        </Stack>
    );
}