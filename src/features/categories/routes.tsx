// src/features/categories/routes.tsx

import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";

import { PermissionGuard, SplashScreen } from "@/shared/components";

const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const CreateCategoryPage = lazy(() => import("./pages/CreateCategoryPage"));
const EditCategoryPage = lazy(() => import("./pages/EditCategoryPage"));
const CategoryDetailsPage = lazy(() => import("./pages/CategoryDetailsPage"));

export const categoriesRoutes: RouteObject[] = [
    {
        path: "categories",
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["category.read"]}>
                            <CategoriesPage />
                        </PermissionGuard>
                    </Suspense>
                ),
            },
            {
                path: "create",
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["category.create"]}>
                            <CreateCategoryPage />
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
                                <PermissionGuard requiredPermissions={["category.read"]}>
                                    <CategoryDetailsPage />
                                </PermissionGuard>
                            </Suspense>
                        ),
                    },
                    {
                        path: "edit",
                        element: (
                            <Suspense fallback={<SplashScreen />}>
                                <PermissionGuard requiredPermissions={["category.update"]}>
                                    <EditCategoryPage />
                                </PermissionGuard>
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];