import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";

import { SplashScreen } from "@/shared/components";

const SigninPage = lazy(() => import("@/features/auth/pages/LoginPage"))
const ForgetPasswordPage = lazy(() => import("@/features/auth/pages/ForgetPasswordPage"))
const ResetPasswordPage = lazy(() => import("@/features/auth/pages/ResetPasswordPage"))

export const authRoutes: RouteObject[] = [
    {
        path: "login",
        element: <Suspense fallback={<SplashScreen />}>
            <SigninPage />
        </Suspense>
    },
    {
        path: "forget-password",
        element: <Suspense fallback={<SplashScreen />}>
            <ForgetPasswordPage />
        </Suspense>
    },
    {
        path: "rest-password",
        element: <Suspense fallback={<SplashScreen />}>
            <ResetPasswordPage />
        </Suspense>
    }
]