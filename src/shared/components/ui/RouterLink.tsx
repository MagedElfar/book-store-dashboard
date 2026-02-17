import { Link, type LinkProps } from '@mui/material'
import { Link as DomRouterLink } from "react-router-dom"

interface Props extends LinkProps {
  to: string,
  text: string
}

export function RouterLink({ to, text, ...props }: Props) {
  return <Link
    {...props}
    underline="hover"
    component={DomRouterLink}
    to={to}
  >
    {text}
  </Link>
}
