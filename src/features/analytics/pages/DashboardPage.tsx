import {
    Box,
    Typography,
    Avatar,
    Stack,
    Skeleton,
    Paper
} from '@mui/material';
import dayjs from 'dayjs';
import { useState, lazy, useMemo, Suspense, useCallback } from 'react';

import { useAuthState } from '@/features/auth';
import { DataFilterToolbar, FilterDateRange, FilterSelect, PageWrapper } from '@/shared/components';
import { useLocalize } from '@/shared/lib';

const OverviewSection = lazy(() => import('./../sections/OverviewSection'));
const BooksSection = lazy(() => import('./../sections/BooksSection'));
const UsersSection = lazy(() => import('./../sections/UsersSection'));

interface FilterType {
    dateRange: string,
    customStartDate: string | null
    customEndDate: string | null
}

const initFilter: FilterType = {
    dateRange: "7d",
    customEndDate: null,
    customStartDate: null
}

const DashboardPage = () => {

    const { t } = useLocalize("analytics")
    const { user } = useAuthState()

    const [filter, setFilter] = useState<FilterType>(initFilter)

    const analyticsParams = useMemo(() => {

        const { dateRange, customEndDate, customStartDate } = filter
        let startDate: string | null = null;
        let endDate = dayjs().toISOString();

        if (dateRange === 'custom') {
            startDate = customStartDate ? dayjs(customStartDate).startOf('day').toISOString() : null;
            endDate = customEndDate ? dayjs(customEndDate).endOf('day').toISOString() : dayjs().toISOString();
        } else {
            switch (dateRange) {
                case '24h': startDate = dayjs().subtract(24, 'hour').toISOString(); break;
                case '7d': startDate = dayjs().subtract(7, 'day').toISOString(); break;
                case '30d': startDate = dayjs().subtract(30, 'day').toISOString(); break;
                default: startDate = null; // All Time
            }
        }
        return { startDate, endDate };
    }, [filter]);

    const handleFilterChange = useCallback((key: keyof FilterType, value: any) => setFilter(prev => ({
        ...prev,
        [key]: value
    })), [])

    const handleRest = useCallback(() => setFilter(initFilter), []);

    const rangeOptions = useMemo(() => [
        { value: "24h", label: t("filters.last24h") },
        { value: "7d", label: t("filters.last7d") },
        { value: "30d", label: t("filters.last30d") },
        { value: "all", label: t("filters.allTime") },
        { value: "custom", label: t("filters.custom") }
    ], [t])

    return (

        <PageWrapper>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 5,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: (theme) => `linear-gradient(45deg, ${theme.palette.background.paper} 30%, ${theme.palette.primary.light} 300%)`,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
                }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    alignItems="center"
                >
                    <Avatar
                        src={user?.avatar_url || ""}
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: 'primary.main',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                            border: '4px solid #fff'
                        }}
                    >
                        {user?.full_name?.slice(0, 2).toUpperCase()}
                    </Avatar>

                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, color: 'text.primary' }}>
                            {t("welcome.title", { name: user?.full_name })}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {t("welcome.subtitle")}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            <DataFilterToolbar
                onClear={handleRest}
                disableSearch
            >
                <FilterSelect
                    label={t("filters.dateRange")}
                    value={filter.dateRange}
                    options={rangeOptions}
                    onChange={handleFilterChange}
                    inputKey="dateRange"
                />

                {filter.dateRange === 'custom' && <>
                    <FilterDateRange
                        startDate={filter.customStartDate}
                        endDate={filter.customEndDate}
                        labels={{
                            start: t("filters.startDate"),
                            end: t("filters.endDate")
                        }}
                        startKey="customStartDate"
                        endKey="customEndDate"
                        onDateChange={handleFilterChange}
                    />
                </>}
            </DataFilterToolbar>

            <Stack spacing={3}>
                <Suspense fallback={<LoadingSkeleton />}>
                    <OverviewSection params={analyticsParams} />
                </Suspense>

                <Suspense fallback={<LoadingSkeleton />}>
                    <BooksSection params={analyticsParams} />
                </Suspense>


                <Suspense fallback={<LoadingSkeleton />}>
                    <UsersSection params={analyticsParams} />
                </Suspense>
            </Stack>


        </PageWrapper>
    );
};

const LoadingSkeleton = () => (
    <Box sx={{ py: 2 }}>
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 3 }} />
        <Stack direction="row" spacing={3}>
            <Skeleton variant="rectangular" width="100%" height={150} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={150} sx={{ borderRadius: 2 }} />
        </Stack>
    </Box>
);

export default DashboardPage;