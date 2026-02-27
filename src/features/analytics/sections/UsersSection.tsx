import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PeopleIcon from '@mui/icons-material/People';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Grid, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AreaChartFC, PieChartFC, StatsBoard, type StatItem } from '@/shared/components';

import { AnalyticsChartCard } from '../components';
import { useUserGrowth, useCustomerComparison } from '../hooks';

export default function UsersSection({ params }: { params: any }) {
    const { t } = useTranslation("analytics");

    const { data: userGrowth, isLoading: userLoading } = useUserGrowth(params);
    const { data: customers, isLoading: custLoading } = useCustomerComparison(params);

    const statsItems: StatItem[] = useMemo(() => {
        const totalNewUsers = userGrowth?.reduce((acc, curr) => acc + curr.new_users_count, 0) || 0;

        return [
            {
                title: t("stats.newUsers"),
                value: totalNewUsers,
                icon: <PeopleIcon fontSize="large" />,
                color: 'info',
                loading: userLoading
            },
            {
                title: t("stats.guestVsReg"),
                value: customers?.length || 0,
                icon: <GroupWorkIcon fontSize="large" />,
                color: 'info',
                loading: custLoading
            },
            {
                title: t("stats.activeNow"),
                value: Math.floor(totalNewUsers / 4),
                icon: <PersonAddIcon fontSize="large" />,
                color: 'success',
                loading: userLoading
            },
            {
                title: t("stats.growthRate"),
                value: "+12.5%",
                icon: <QueryStatsIcon fontSize="large" />,
                color: 'warning',
                loading: userLoading
            }
        ];
    }, [userGrowth, customers, t, userLoading, custLoading]);

    const growthChartData = useMemo(() =>
        userGrowth?.map(item => ({
            date: item.reg_date,
            users: item.new_users_count
        })) || [], [userGrowth]);

    const distributionData = useMemo(() =>
        customers?.map(item => ({
            name: item.customer_type,
            value: item.total_orders
        })) || [], [customers]);

    return (
        <Stack spacing={3}>

            <Stack direction="row" alignItems="center" spacing={1}>
                <PeopleAltIcon color="primary" />
                <Typography color="primary" variant="subtitle1">
                    {t("tabs.users")}
                </Typography>
            </Stack>

            <StatsBoard
                // columns={{ xs: 12, sm: 4, md: 4 }}
                items={statsItems}
            />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <AnalyticsChartCard
                        title={t("charts.userGrowth")}
                        loading={userLoading}
                    >
                        <AreaChartFC
                            data={growthChartData}
                            xKey="date"
                            yKey="users"
                        />
                    </AnalyticsChartCard>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <AnalyticsChartCard
                        title={t("charts.userDistribution")}
                        loading={custLoading}
                    >
                        <PieChartFC data={distributionData} />
                    </AnalyticsChartCard>
                </Grid>
            </Grid>
        </Stack>
    );
}