import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { createAppTheme, createEmotionCache } from '@/theme'

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'

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
