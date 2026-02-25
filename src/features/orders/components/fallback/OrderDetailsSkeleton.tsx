import { Box, Card, CardContent, Grid, Skeleton, Stack } from '@mui/material';

export function OrderDetailsSkeleton() {
    return (
        <Stack spacing={3}>
            {/* 1. Header Skeleton (Title & Actions) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Skeleton variant="text" width={250} height={40} />
                <Stack direction="row" spacing={1}>
                    <Skeleton variant="rounded" width={80} height={24} />
                    <Skeleton variant="rounded" width={80} height={24} />
                    <Skeleton variant="rounded" width={100} height={32} />
                </Stack>
            </Box>

            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={2}>
                        {/* OrderCustomerInfo Skeleton */}
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6 }}>
                                        <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1 }} />
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="text" width="80%" />
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1 }} />
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="text" width="80%" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* OrderAdditionalInfo Skeleton */}
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Stack direction="row" spacing={4}>
                                    <Skeleton variant="text" width="30%" height={30} />
                                    <Skeleton variant="text" width="30%" height={30} />
                                    <Skeleton variant="text" width="30%" height={30} />
                                </Stack>
                            </CardContent>
                        </Card>

                    </Stack>
                </Grid>

                {/* Right Column (Sidebar) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={2}>
                        {/* Status Actions Skeleton */}
                        <Card sx={{ borderRadius: 3, p: 2 }}>
                            <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
                            <Skeleton variant="rounded" width="100%" height={45} sx={{ mb: 1 }} />
                            <Skeleton variant="rounded" width="100%" height={45} />
                        </Card>

                        {/* Summary Card Skeleton */}
                        <Card sx={{ borderRadius: 3, p: 2 }}>
                            <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
                            <Stack spacing={1}>
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 1, borderRadius: 1 }} />
                            </Stack>
                        </Card>
                    </Stack>
                </Grid>

                {/* OrderItemsTable Skeleton */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ borderRadius: 3 }}>
                        <Box sx={{ p: 2 }}>
                            <Skeleton variant="text" width={150} height={30} sx={{ mb: 2 }} />
                            {[1, 2, 3].map((i) => (
                                <Stack key={i} direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                    <Skeleton variant="rounded" width={50} height={70} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Skeleton variant="text" width="40%" />
                                        <Skeleton variant="text" width="20%" />
                                    </Box>
                                    <Skeleton variant="text" width={60} />
                                </Stack>
                            ))}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Stack>
    );
}