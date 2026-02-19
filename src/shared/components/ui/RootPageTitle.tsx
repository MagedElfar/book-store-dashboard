import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from '@mui/material'

interface Props {
    title: string
    onClick?: () => void
    btnText?: string
}

export function RootPageTitle({ title, onClick, btnText }: Props) {
    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ md: "space-between" }}
            alignItems={{ md: "center" }}
            spacing={1}
        // mb={{ xs: 2, md: 3 }}
        >
            <Typography
                component="h1"
                variant="h1"
            >
                {title}
            </Typography>
            {onClick && <Button
                onClick={onClick}
                variant="contained"
                size="large"
                startIcon={<AddIcon fontSize='small' />}
                sx={{
                    fontWeight: "700"
                }}
            >
                {btnText}
            </Button>}
        </Stack>
    )
}
