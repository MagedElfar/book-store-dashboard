// src/features/authors/components/AuthorFormSkeleton.tsx

import { Card, Grid, Skeleton, Stack } from "@mui/material";

export function AuthorFormSkeleton() {
    return (
        <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4 }}>
            <Stack spacing={3}>
                <Grid container spacing={3}>
                    {/* Names (Arabic & English) */}
                    {[1, 2].map((item) => (
                        <Grid size={{ xs: 12, md: 6 }} key={item}>
                            <Skeleton variant="text" width={100} sx={{ mb: 1 }} />
                            <Skeleton variant="rounded" height={56} sx={{ borderRadius: 1.5 }} />
                        </Grid>
                    ))}

                    {/* Slug & Birth Date */}
                    {[3, 4].map((item) => (
                        <Grid size={{ xs: 12, md: 6 }} key={item}>
                            <Skeleton variant="text" width={80} sx={{ mb: 1 }} />
                            <Skeleton variant="rounded" height={56} sx={{ borderRadius: 1.5 }} />
                        </Grid>
                    ))}

                    {/* Biography (Slightly taller than normal description) */}
                    {[5, 6].map((item) => (
                        <Grid size={{ xs: 12, md: 6 }} key={item}>
                            <Skeleton variant="text" width={120} sx={{ mb: 1 }} />
                            <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
                        </Grid>
                    ))}

                    {/* Status Switch Skeleton */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Skeleton variant="text" width={60} sx={{ mb: 1 }} />
                        <Skeleton variant="rounded" width={140} height={40} sx={{ borderRadius: 1 }} />
                    </Grid>

                    {/* Image Dropzone */}
                    <Grid size={{ xs: 12 }}>
                        <Skeleton variant="text" width={150} sx={{ mb: 1 }} />
                        <Skeleton variant="rounded" height={140} sx={{ borderRadius: 2 }} />
                    </Grid>
                </Grid>

                {/* Submit Button */}
                <Skeleton
                    variant="rounded"
                    width={200}
                    height={48}
                    sx={{ borderRadius: '50px', alignSelf: { xs: 'center', md: 'center' } }}
                />
            </Stack>
        </Card>
    );
}