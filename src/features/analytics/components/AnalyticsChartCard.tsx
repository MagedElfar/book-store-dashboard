import { Card, Typography, Box, Skeleton } from '@mui/material';
import type { ReactNode } from 'react';

interface ChartCardProps {
    title: string;
    subheader?: string;
    children: ReactNode;
    loading?: boolean;
}

export const AnalyticsChartCard = ({ title, subheader, children, loading }: ChartCardProps) => (
    <Card sx={{ p: 3, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
            {subheader && <Typography variant="caption" color="text.secondary">{subheader}</Typography>}
        </Box>
        <Box sx={{ flexGrow: 1, minHeight: 300, position: 'relative' }}>
            {loading ? (
                <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 2 }} />
            ) : (
                children
            )}
        </Box>
    </Card>
);