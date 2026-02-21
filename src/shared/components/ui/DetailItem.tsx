import { Stack, Box, Typography } from "@mui/material";

export function DetailItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{
                p: 1,
                borderRadius: 1.5,
                bgcolor: 'action.hover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.2 }}>
                    {label}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}