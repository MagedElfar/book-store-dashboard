import { Container as MUIContainer, type ContainerProps } from '@mui/material'
import { type ReactNode } from 'react'

export interface Props extends ContainerProps {
  children: ReactNode
}

export function Container({ children, sx, maxWidth, ...props }: Props) {

  return (
    <MUIContainer
      maxWidth={maxWidth || "lg"}
      sx={{
        height: "100%",
        px: 2,
        py: 2,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MUIContainer>
  )
}
