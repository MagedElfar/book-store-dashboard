import { Box, Grid, Skeleton, Stack } from "@mui/material";

export function AddressFormSkeleton() {
    return (
        <Box sx={{ width: '100%', p: 1 }}>
            <Grid container spacing={3}>

                {/* Full Name Field Skeleton */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
                    </Stack>
                </Grid>

                {/* Phone Field Skeleton */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
                    </Stack>
                </Grid>

                {/* Country Field Skeleton */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
                    </Stack>
                </Grid>

                {/* City Field Skeleton */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
                    </Stack>
                </Grid>

                {/* Street Address Field Skeleton (Multiline) */}
                <Grid size={{ xs: 12 }}>
                    <Stack spacing={1}>
                        <Skeleton variant="text" width={140} height={20} />
                        <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 1 }} />
                    </Stack>
                </Grid>

                {/* Is Default Checkbox Skeleton */}
                <Grid size={{ xs: 12 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Skeleton variant="rectangular" width={24} height={24} sx={{ borderRadius: 0.5 }} />
                        <Skeleton variant="text" width={180} height={20} />
                    </Stack>
                </Grid>

                {/* Map Picker Area Skeleton */}
                <Grid size={{ xs: 12 }}>
                    <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Skeleton variant="text" width={120} height={25} />
                            <Skeleton variant="rectangular" width={110} height={32} sx={{ borderRadius: 1 }} />
                        </Stack>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={350}
                            sx={{ borderRadius: 1 }}
                        />
                    </Stack>
                </Grid>

                {/* Submit Button Skeleton (If needed inside the container) */}
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Skeleton variant="rectangular" width={160} height={45} sx={{ borderRadius: 1 }} />
                </Grid>

            </Grid>
        </Box>
    );
}