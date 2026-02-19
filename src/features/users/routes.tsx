import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";
import { Outlet } from "react-router-dom"

import { PermissionGuard, SplashScreen } from "@/shared/components";

const CreateUserPage = lazy(() => import("@/features/users/pages/CreateUserPage"))
const UsersPage = lazy(() => import("@/features/users/pages/UsersPage"))
const EditUserPage = lazy(() => import("@/features/users/pages/EditUserPage"))
const UserDetailsPage = lazy(() => import("@/features/users/pages/UserDetailsPage"))


export const usersRoutes: RouteObject[] = [
    {
        path: "users",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<SplashScreen />}>
                    <PermissionGuard requiredPermissions={["user.read"]}>
                        <UsersPage />
                    </PermissionGuard>
                </Suspense>
            },
            {
                path: "create",
                element: <Suspense fallback={<SplashScreen />}>
                    <PermissionGuard requiredPermissions={["user.create"]}>
                        <CreateUserPage />
                    </PermissionGuard>
                </Suspense>
            },
            {
                path: ":id",
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<SplashScreen />}>
                            <PermissionGuard requiredPermissions={["user.read"]}>
                                <UserDetailsPage />
                            </PermissionGuard>
                        </Suspense>
                    },
                    {
                        path: "edit",
                        element: <Suspense fallback={<SplashScreen />}>
                            <PermissionGuard requiredPermissions={["user.update"]}>
                                <EditUserPage />
                            </PermissionGuard>
                        </Suspense>
                    }
                ]
            }
        ]
    }
]