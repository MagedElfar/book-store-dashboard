// import Container from './Container'
import { LinearProgress, Stack } from '@mui/material'

import { Logo } from '../ui/Logo'

interface Props {
    withLogo?: boolean
}

export function SplashScreen({ withLogo }: Props) {
    return <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        bgcolor="background.paper"
        sx={{
            width: "100%",
            height: "100%",
        }}>
        {withLogo && <Logo sx={{ pointerEvents: "none" }} />}
        <LinearProgress sx={{ width: "50%" }} color="secondary" />
    </Stack>
}

