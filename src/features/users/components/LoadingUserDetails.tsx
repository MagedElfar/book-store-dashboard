import { Card, Grid, Stack, Skeleton, Box } from "@mui/material";

export function LoadingUserDetails() {
    return (
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            {/* الجزء الأيسر - الصورة والاسم */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: 1000, p: 3, borderRadius: 4, textAlign: 'center' }}>
                    <Skeleton variant="circular" width={140} height={140} sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width="40%" height={24} sx={{ mx: 'auto' }} />
                </Card>
            </Grid>

            {/* الجزء الأيمن - التفاصيل */}
            <Grid size={{ xs: 12, md: 8 }}>
                <Card sx={{ height: '100%', p: 4, borderRadius: 4 }}>
                    <Skeleton variant="text" width="30%" height={32} sx={{ mb: 3 }} />
                    <Stack spacing={3}>
                        {[1, 2, 3, 4].map((item) => (
                            <Stack key={item} direction="row" spacing={2} alignItems="center">
                                <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 1.5 }} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Skeleton variant="text" width="20%" />
                                    <Skeleton variant="text" width="50%" height={24} />
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    );
}