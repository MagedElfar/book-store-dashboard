import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";

import { SplashScreen } from "@/shared/components";

const SigninPage = lazy(() => import("@/features/auth/pages/LoginPage"))

export const authRoutes: RouteObject[] = [
    {
        path: "login",
        element: <Suspense fallback={<SplashScreen />}>
            <SigninPage />
        </Suspense>
    }
]