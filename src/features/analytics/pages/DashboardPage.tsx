import {
    Box,
    Typography,
    Avatar,
    Stack,
    Skeleton,
    Paper
} from '@mui/material';
import dayjs from 'dayjs';
import { useState, lazy, useMemo, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthState } from '@/features/auth';
import { DataFilterToolbar, FilterDateRange, FilterSelect, PageWrapper } from '@/shared/components';

const OverviewSection = lazy(() => import('./../sections/OverviewSection'));
const BooksSection = lazy(() => import('./../sections/BooksSection'));
const UsersSection = lazy(() => import('./../sections/UsersSection'));


const DashboardPage = () => {


    const { t } = useTranslation("analytics")
    const { user } = useAuthState()
    const [dateRange, setDateRange] = useState('7d');
    const [customStartDate, setCustomStartDate] = useState<string | null>(null);
    const [customEndDate, setCustomEndDate] = useState<string | null>(null);

    const analyticsParams = useMemo(() => {
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
    }, [dateRange, customStartDate, customEndDate]);

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


            {/* <Stack
                spacing={3}
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
                sx={{
                    mb: 4,
                    gap: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    pb: 0.5 
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        '& .MuiTab-root': {
                            fontWeight: '700',
                            textTransform: 'none',
                            fontSize: '0.95rem',
                            minWidth: 120,
                            minHeight: 48, // ارتفاع مناسب لدمج الأيقونة مع النص
                            display: 'flex',
                            flexDirection: 'row', // الأيقونة بجانب النص
                            alignItems: 'center',
                            gap: 1, // مسافة بين الأيقونة والنص
                            '& svg': {
                                fontSize: '1.2rem', // حجم الأيقونة
                            }
                        }
                    }}
                >
                    <Tab
                        icon={<DashboardCustomizeIcon />}
                        iconPosition="start"
                        label={t("tabs.overview")}
                    />
                    <Tab
                        icon={<InventoryIcon />}
                        iconPosition="start"
                        label={t("tabs.inventory")}
                    />
                    <Tab
                        icon={<PeopleAltIcon />}
                        iconPosition="start"
                        label={t("tabs.users")}
                    />
                </Tabs>
            </Stack> */}

            <DataFilterToolbar
                onClear={() => setDateRange("7d")}
            >
                <FilterSelect
                    label={t("filters.dateRange")}
                    value={dateRange}
                    options={[
                        { value: "24h", label: t("filters.last24h") },
                        { value: "7d", label: t("filters.last7d") },
                        { value: "30d7d", label: t("filters.last30d") },
                        { value: "all", label: t("filters.allTime") },
                        { value: "custom", label: t("filters.custom") }
                    ]}
                    onChange={(val) => setDateRange(val as string)}
                />

                {dateRange === 'custom' && <>
                    <FilterDateRange
                        startDate={customStartDate || null}
                        endDate={customEndDate || null}
                        labels={{
                            start: t("filters.startDate"),
                            end: t("filters.endDate")
                        }}
                        onDateChange={(start, end) => {
                            setCustomStartDate(start);
                            setCustomEndDate(end);
                        }}
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