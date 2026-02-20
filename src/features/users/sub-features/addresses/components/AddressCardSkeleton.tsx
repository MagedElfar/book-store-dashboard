import { Card, CardContent, Skeleton, Stack, Divider, Box, Grid } from "@mui/material";

export function AddressCardSkeleton() {
    return (
        <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
                {/* Header: Name & Actions Skeleton */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Stack spacing={1} sx={{ width: '70%' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            {/* Full Name */}
                            <Skeleton variant="text" width="60%" height={24} />
                            {/* Default Chip Placeholder */}
                            <Skeleton variant="rounded" width={60} height={20} />
                        </Stack>
                        {/* Phone Number */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Skeleton variant="circular" width={16} height={16} />
                            <Skeleton variant="text" width="40%" height={16} />
                        </Stack>
                    </Stack>

                    {/* Action Buttons (Edit & Delete) */}
                    <Stack direction="row" spacing={0.5}>
                        <Skeleton variant="circular" width={30} height={30} />
                        <Skeleton variant="circular" width={30} height={30} />
                    </Stack>
                </Stack>

                <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />

                {/* Location Text Placeholder */}
                <Stack direction="row" spacing={1} sx={{ mb: 2, minHeight: 40 }}>
                    <Skeleton variant="circular" width={20} height={20} sx={{ mt: 0.5 }} />
                    <Box sx={{ width: '100%' }}>
                        <Skeleton variant="text" width="90%" />
                        <Skeleton variant="text" width="60%" />
                    </Box>
                </Stack>

                {/* Map Preview Placeholder */}
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={160}
                    sx={{ borderRadius: 1 }}
                />
            </CardContent>
        </Card>
    );
}

export function LoadingAddressList() {
    return (
        <Grid container spacing={3}>
            {[...Array(3)].map((_, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                    <AddressCardSkeleton />
                </Grid>
            ))}
        </Grid>
    );
}