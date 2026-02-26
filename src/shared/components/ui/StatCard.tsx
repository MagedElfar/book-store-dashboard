import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Card, Stack, Skeleton, Box, Avatar, Typography, alpha, useTheme } from "@mui/material";

export interface StatItem {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    loading?: boolean;
    growth?: number;
}

export function StatCard({ item }: { item: StatItem }) {
    const theme = useTheme();

    const colorMain = theme.palette[item.color || 'primary'].main;
    const colorLighter = alpha(colorMain, 0.1);

    const getTrendDetails = (growth: number) => {
        if (growth > 0) return {
            color: theme.palette.success.main,
            icon: <TrendingUpIcon sx={{ fontSize: 14, mr: 0.3 }} />,
            label: `+${growth}%`
        };
        if (growth < 0) return {
            color: theme.palette.error.main,
            icon: <TrendingDownIcon sx={{ fontSize: 14, mr: 0.3 }} />,
            label: `${growth}%`
        };
        return {
            color: theme.palette.text.secondary,
            icon: <TrendingFlatIcon sx={{ fontSize: 14, mr: 0.3 }} />,
            label: '0%'
        };
    };

    if (item.loading) {
        return (
            <Card sx={{ p: 3, borderRadius: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Skeleton variant="circular" width={56} height={56} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="70%" height={40} />
                    </Box>
                </Stack>
            </Card>
        );
    }

    const trend = item.growth !== undefined ? getTrendDetails(item.growth) : null;

    return (
        <Card sx={{
            p: 3,
            borderRadius: 4,
            boxShadow: theme.shadows[1],
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
            height: "100%",
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[4]
            }
        }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{
                    width: 56,
                    height: 56,
                    bgcolor: colorLighter,
                    color: colorMain,
                    borderRadius: 3,
                }}>
                    {item.icon}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
                        {item.title}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                            {item.value}
                        </Typography>

                        {trend && (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: alpha(trend.color, 0.1),
                                color: trend.color,
                                px: 1,
                                py: 0.3,
                                borderRadius: 1.5,
                                border: `1px solid ${alpha(trend.color, 0.2)}`
                            }}>
                                {trend.icon}
                                <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1 }}>
                                    {trend.label}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Card>
    );
}