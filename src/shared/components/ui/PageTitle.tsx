import { Typography, type TypographyProps } from '@mui/material'

interface Props extends TypographyProps<"h1"> {
    title: string
}

export function PageTitle({ title, ...props }: Props) {
    return <Typography
        {...props}
        component="h1"
        variant="h1"
        mb={{ xs: 2, md: 3 }}
    >
        {title}
    </Typography>
}
