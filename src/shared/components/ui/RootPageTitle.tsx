import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from '@mui/material'

interface Props {
    title: string
    onClick?: () => void
    btnText?: string
    nested?: boolean
}

export function RootPageTitle({ title, onClick, btnText, nested }: Props) {
    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ md: "space-between" }}
            alignItems={{ md: "center" }}
            spacing={1}
        >
            <Typography
                component={nested ? "h2" : "h1"}
                variant={nested ? "h2" : "h1"}
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
