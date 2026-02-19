import { Card, Grid, Skeleton, Stack } from "@mui/material";

export function FormSkeleton() {
    return (
        <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4 }}>
            <Stack spacing={3}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Skeleton variant="text" width={100} sx={{ mb: 1 }} />
                        <Skeleton variant="rounded" height={56} sx={{ borderRadius: 1.5 }} />
                    </Grid>

                    {[1, 2, 3, 4].map((item) => (
                        <Grid size={{ xs: 12, md: 6 }} key={item}>
                            <Skeleton variant="text" width={80} sx={{ mb: 1 }} />
                            <Skeleton variant="rounded" height={56} sx={{ borderRadius: 1.5 }} />
                        </Grid>
                    ))}

                    <Grid size={{ xs: 12 }}>
                        <Skeleton variant="text" width={120} sx={{ mb: 1 }} />
                        <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
                    </Grid>
                </Grid>

                <Skeleton
                    variant="rounded"
                    width={250}
                    height={48}
                    sx={{ borderRadius: '50px', alignSelf: { xs: 'center', md: 'flex-start' } }}
                />
            </Stack>
        </Card>
    );
}