import { Grid, Skeleton, Box } from '@mui/material';

export function BasicInfoStepSkeleton() {
    return (
        <Grid container spacing={3}>
            {/* Title EN & Title AR */}
            {[1, 2].map((i) => (
                <Grid key={i} size={{ xs: 12, md: 6 }}>
                    <Box sx={{ mb: 1 }}>
                        <Skeleton variant="text" width="30%" height={20} />
                    </Box>
                    <Skeleton variant="rounded" height={56} />
                </Grid>
            ))}

            {/* Slug & SKU */}
            {[3, 4].map((i) => (
                <Grid key={i} size={{ xs: 12, md: 6 }}>
                    <Box sx={{ mb: 1 }}>
                        <Skeleton variant="text" width="25%" height={20} />
                    </Box>
                    <Skeleton variant="rounded" height={56} />
                </Grid>
            ))}

            {/* Description EN (Rich Text) */}
            <Grid size={{ xs: 12 }}>
                <Box sx={{ mb: 1 }}>
                    <Skeleton variant="text" width="15%" height={20} />
                </Box>
                {/* هيكل يحاكي محرر النصوص الغني */}
                <Skeleton variant="rounded" height={200} />
            </Grid>

            {/* Description AR (Rich Text) */}
            <Grid size={{ xs: 12 }}>
                <Box sx={{ mb: 1 }}>
                    <Skeleton variant="text" width="15%" height={20} />
                </Box>
                <Skeleton variant="rounded" height={200} />
            </Grid>
        </Grid>
    );
}