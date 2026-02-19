import { type ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify';

import { AuthProvider } from '@/features/auth/providers/AuthProvider';
import { AppThemeProvider } from '@/theme';

import { ReactQueryProvider } from './ReactQueryProvider';

export function AppProviders({ children }: { children: ReactNode }) {
    return <ReactQueryProvider>
        <AuthProvider>
            <AppThemeProvider>
                <ToastContainer transition={Slide} />
                {children}
            </AppThemeProvider>
        </AuthProvider>
    </ReactQueryProvider>

}
