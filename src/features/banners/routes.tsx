// src/features/authors/routes.tsx

import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";

import { PermissionGuard, SplashScreen } from "@/shared/components";

const CreateBannerPage = lazy(() => import("./pages/CreateBannerPage"));
const BannersPage = lazy(() => import("./pages/BannersPage"));
const EditBannerPage = lazy(() => import("./pages/EditBannerPage"));

export const bannersRoutes: RouteObject[] = [
    {
        path: "banners",
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["banner.read"]}>
                            <BannersPage />
                        </PermissionGuard>
                    </Suspense>
                ),
            },
            {
                path: "create",
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["banner.create"]}>
                            <CreateBannerPage />
                        </PermissionGuard>
                    </Suspense>
                ),
            },
            {
                path: ":id",
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<SplashScreen />}>
                                <PermissionGuard requiredPermissions={["banner.update"]}>
                                    <EditBannerPage />
                                </PermissionGuard>
                            </Suspense>
                        ),
                    }
                ],
            },
        ],
    },
];