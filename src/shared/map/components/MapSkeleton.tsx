import { Box, Skeleton, Stack } from '@mui/material';

export function MapSkeleton() {
    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            {/* Top row: Label and Button skeletons */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Skeleton variant="text" width={100} height={24} />
                <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 1 }} />
            </Stack>

            {/* Main map area skeleton */}
            <Skeleton
                variant="rectangular"
                width="100%"
                height={350} // Same height as your real map
                sx={{ borderRadius: 1 }}
            />
        </Box>
    );
}