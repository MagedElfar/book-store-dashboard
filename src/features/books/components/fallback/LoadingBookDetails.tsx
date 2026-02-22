// src/features/books/components/LoadingBookDetails.tsx

import { Card, CardContent, Divider, Grid, Skeleton, Stack, Box } from "@mui/material";

export function LoadingBookDetails() {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
                <Stack spacing={3}>
                    <Card sx={{ p: 3, borderRadius: 4 }}>
                        <Skeleton
                            variant="rounded"
                            width="100%"
                            height={320}
                            sx={{ borderRadius: 2, mb: 2 }}
                        />
                        <Skeleton variant="text" width="80%" height={32} sx={{ mx: 'auto' }} />
                        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 1 }}>
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton variant="text" width={40} />
                        </Stack>

                        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Skeleton variant="text" width="40%" height={50} />
                        </Box>
                    </Card>

                    <Card sx={{ p: 2, borderRadius: 4 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Skeleton variant="circular" width={40} height={40} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Skeleton variant="text" width="30%" />
                                <Skeleton variant="text" width="60%" />
                            </Box>
                        </Stack>
                    </Card>
                </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 8 }}>
                <Stack spacing={3}>

                    {/* كرت الوصف */}
                    <Card sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Skeleton variant="text" width="20%" height={30} sx={{ mb: 2 }} />
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width="70%" />
                        </CardContent>
                    </Card>

                    {/* كرت البيانات التقنية */}
                    <Card sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Grid container spacing={3}>
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <Grid size={{ xs: 12, sm: 6 }} key={item}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Skeleton variant="circular" width={30} height={30} />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Skeleton variant="text" width="40%" />
                                                <Skeleton variant="text" width="70%" />
                                            </Box>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Skeleton للتصنيفات (Chips) */}
                            <Skeleton variant="text" width="15%" sx={{ mb: 1 }} />
                            <Stack direction="row" spacing={1}>
                                <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 5 }} />
                                <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 5 }} />
                                <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 5 }} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
        </Grid>
    );
}