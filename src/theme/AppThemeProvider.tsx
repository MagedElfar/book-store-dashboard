import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { useMemo } from 'react'

import { useLocalize } from '@/shared/lib'
import { createAppTheme, createEmotionCache } from '@/theme'

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { dir: direction } = useLocalize()

  const theme = useMemo(() => {
    document.documentElement.dir = direction
    return createAppTheme(direction)
  }, [direction])

  const cache = React.useMemo(() => createEmotionCache(direction === "rtl"), [direction]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider
        theme={theme}
        noSsr
      >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>

  )
}
