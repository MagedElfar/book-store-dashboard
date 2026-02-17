import { createBrowserRouter } from "react-router-dom";

import { accountRoutes } from "@/features/account";
import { authRoutes } from "@/features/auth";
import { AuthLayout, DashboardLayout, ProfileLayout } from "@/layouts";
import { ProtectedRoute } from "@/shared/components";

export const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthLayout />,
        children: authRoutes,
    },
    {
        path: "/account",
        element: (
            <ProtectedRoute>
                <ProfileLayout />
            </ProtectedRoute>
        ),
        children: accountRoutes
    },
    {
        path: "/",
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

        ],
    },
]);
