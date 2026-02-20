import { Card, Stack, Skeleton, Box, Avatar, Typography, alpha, useTheme } from "@mui/material";

export interface StatItem {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    loading?: boolean;
}

export function StatCard({ item }: { item: StatItem }) {
    const theme = useTheme();
    const colorMain = theme.palette[item.color || 'primary'].main;
    const colorLighter = alpha(colorMain, 0.1);

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

    return (
        <Card sx={{
            p: 3,
            borderRadius: 4,
            boxShadow: theme.shadows[1],
            transition: 'transform 0.2s',
            height: "100%",
            '&:hover': { transform: 'translateY(-4px)' }
        }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{
                    width: 56,
                    height: 56,
                    bgcolor: colorLighter,
                    color: colorMain,
                    borderRadius: 2
                }}>
                    {item.icon}
                </Avatar>

                <Box>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                        {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {item.value}
                    </Typography>
                </Box>
            </Stack>
        </Card>
    );
}