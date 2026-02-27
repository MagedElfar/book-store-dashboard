import { type ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify';

import { AuthProvider } from '@/features/auth/providers/AuthProvider';
import { AppThemeProvider } from '@/theme';

import AppInitializer from './AppInitializer';
import { ReactQueryProvider } from './ReactQueryProvider';

export function AppProviders({ children }: { children: ReactNode }) {

    return <ReactQueryProvider>
        <AuthProvider>
            <AppThemeProvider>
                <ToastContainer transition={Slide} />
                <AppInitializer />
                {children}
            </AppThemeProvider>
        </AuthProvider>
    </ReactQueryProvider>

}
