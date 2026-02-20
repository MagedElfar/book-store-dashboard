import { Card, Grid, Stack, Skeleton, Box } from "@mui/material";

export function LoadingCategoryDetails() {
    return (
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: '100%', p: 3, borderRadius: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Skeleton variant="rounded" width={140} height={140} sx={{ mx: 'auto', mb: 2, borderRadius: 3 }} />
                    <Skeleton variant="text" width="70%" height={32} sx={{ mx: 'auto' }} />
                    <Skeleton variant="rounded" width="30%" height={24} sx={{ mx: 'auto', mt: 1, borderRadius: 1 }} />
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
                <Card sx={{ height: '100%', p: 4, borderRadius: 4 }}>
                    <Skeleton variant="text" width="30%" height={32} sx={{ mb: 3 }} />

                    <Stack spacing={3}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <Stack key={item} direction="row" spacing={2} alignItems="flex-start">
                                <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 1.5 }} />

                                <Box sx={{ flexGrow: 1 }}>
                                    <Skeleton variant="text" width="15%" />
                                    <Skeleton variant="text" width="60%" height={24} />
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    );
}