import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { accountRoutes } from "@/features/account";
import { authRoutes } from "@/features/auth";
import { usersRoutes } from "@/features/users";
import { AuthLayout, DashboardLayout, ProfileLayout } from "@/layouts";
import { ErrorFallback, ProtectedRoute, PublicRoute, SplashScreen } from "@/shared/components";

const Page403 = lazy(() => import("./../pages/Page403"))
const Page404 = lazy(() => import("./../pages/Page404"))


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ErrorBoundary fallback={<ErrorFallback reset={() => window.location.reload()} />}>
                <Outlet />
            </ErrorBoundary>
        ),
        errorElement: <ErrorFallback reset={() => window.location.reload()} />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: "auth",
                element: (
                    <PublicRoute>
                        <AuthLayout />
                    </PublicRoute>
                ),
                children: authRoutes,
            },
            {
                path: "account",
                element: (
                    <ProtectedRoute>
                        <ProfileLayout />
                    </ProtectedRoute>
                ),
                children: accountRoutes
            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <div>home page</div>,
                    },
                    ...usersRoutes
                ],
            },
            // مسارات الصفحات الخاصة
            { path: "403", element: <Suspense fallback={<SplashScreen withLogo sx={{ height: "100vh" }} />}><Page403 /></Suspense> },
            { path: "*", element: <Suspense fallback={<SplashScreen withLogo sx={{ height: "100vh" }} />}><Page404 /></Suspense> }
        ]
    }
]);