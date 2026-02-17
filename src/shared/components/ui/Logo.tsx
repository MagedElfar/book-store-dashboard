import { Box, Link, type LinkProps } from '@mui/material'
import { Link as RouterLink } from "react-router-dom"

type Props = LinkProps

export function Logo(props: Props) {

    const width = props.width || 60
    const height = props.height || 60

    return (
        <Link
            component={RouterLink}
            to="/"
            {...props}
            width={width}
            height={height}
        >
            <Box
                component="img"
                className='img'
                src='/logo.png'
                alt='brand-logo'
                width={width}
                height={height}
            />
        </Link>
    )
}
