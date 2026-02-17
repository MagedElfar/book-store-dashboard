import { type ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify';

import { AuthProvider } from '@/features/auth/providers/AuthProvider';
import { AppThemeProvider } from '@/theme';

export function AppProviders({ children }: { children: ReactNode }) {
    return <AuthProvider>
        <AppThemeProvider>
            <ToastContainer transition={Slide} />
            {children}
        </AppThemeProvider>
    </AuthProvider>
}
