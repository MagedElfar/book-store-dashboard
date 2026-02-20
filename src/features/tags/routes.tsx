// src/features/categories/routes.tsx

import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";

import { PermissionGuard, SplashScreen } from "@/shared/components";

const TagsPage = lazy(() => import("./pages/TagsPage"));

export const tagsRoutes: RouteObject[] = [
    {
        path: "tags",
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["tag.read"]}>
                            <TagsPage />
                        </PermissionGuard>
                    </Suspense>
                ),
            }
        ],
    },
];