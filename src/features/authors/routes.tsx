// src/features/authors/routes.tsx

import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";

import { PermissionGuard, SplashScreen } from "@/shared/components";

const AuthorsPage = lazy(() => import("./pages/AuthorsPage"));
const CreateAuthorPage = lazy(() => import("./pages/CreateAuthorPage"));
const EditAuthorPage = lazy(() => import("./pages/EditAuthorPage"));
const AuthorDetailsPage = lazy(() => import("./pages/AuthorDetailsPage"));

export const authorsRoutes: RouteObject[] = [
    {
        path: "authors",
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["author.read"]}>
                            <AuthorsPage />
                        </PermissionGuard>
                    </Suspense>
                ),
            },
            {
                path: "create",
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["author.create"]}>
                            <CreateAuthorPage />
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
                                <PermissionGuard requiredPermissions={["author.read"]}>
                                    <AuthorDetailsPage />
                                </PermissionGuard>
                            </Suspense>
                        ),
                    },
                    {
                        path: "edit",
                        element: (
                            <Suspense fallback={<SplashScreen />}>
                                <PermissionGuard requiredPermissions={["author.update"]}>
                                    <EditAuthorPage />
                                </PermissionGuard>
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];