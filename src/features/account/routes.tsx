import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";

import { SplashScreen } from "@/shared/components";

const ProfilePage = lazy(() => import("@/features/account/pages/ProfilePage"))
const ChangeEmailPage = lazy(() => import("@/features/account/pages/ChangeEmailPage"))
const ChangePasswordPage = lazy(() => import("@/features/account/pages/ChangePasswordPage"))
const VerifiedPage = lazy(() => import("@/features/account/pages/VerifiedPage"))

export const accountRoutes: RouteObject[] = [
    {
        index: true,
        element: <Suspense fallback={<SplashScreen />}>
            <ProfilePage />
        </Suspense>
    },
    {
        path: "email",
        element: <Suspense fallback={<SplashScreen />}>
            <ChangeEmailPage />
        </Suspense>
    },
    {
        path: "password",
        element: <Suspense fallback={<SplashScreen />}>
            <ChangePasswordPage />
        </Suspense>
    },
    {
        path: "verified",
        element: <Suspense fallback={<SplashScreen />}>
            <VerifiedPage />
        </Suspense>
    }
]