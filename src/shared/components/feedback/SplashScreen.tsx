// import Container from './Container'
import { LinearProgress, Stack, type StackProps } from '@mui/material'

import { Logo } from '../ui/Logo'

interface Props extends StackProps {
    withLogo?: boolean
}

export function SplashScreen({ withLogo, sx, ...props }: Props) {
    return <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        bgcolor="background.paper"
        sx={{
            width: "100%",
            height: "100%",
            ...sx
        }}>
        {withLogo && <Logo sx={{ pointerEvents: "none" }} />}
        <LinearProgress sx={{ width: "50%" }} color="secondary" />
    </Stack>
}

