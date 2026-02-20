import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";

import { PermissionGuard, SplashScreen } from "@/shared/components";

const CreateAddress = lazy(() => import("@/features/users/sub-features/addresses/pages/CreateAddress"))
const AddressesPage = lazy(() => import("@/features/users/sub-features/addresses/pages/AddressesPage"))
const EditAddressesPage = lazy(() => import("@/features/users/sub-features/addresses/pages/EditAddressesPage"))


export const addressesRoutes: RouteObject[] = [
    {
        path: "addresses",
        children: [
            {
                index: true,
                element: <Suspense fallback={<SplashScreen />}>
                    <PermissionGuard requiredPermissions={["address.read"]}>
                        <AddressesPage />
                    </PermissionGuard>
                </Suspense>
            },
            {
                path: "create",
                element: <Suspense fallback={<SplashScreen />}>
                    <PermissionGuard requiredPermissions={["address.create"]}>
                        <CreateAddress />
                    </PermissionGuard>
                </Suspense>
            },
            {
                path: ":addressId/edit",
                element: <Suspense fallback={<SplashScreen />}>
                    <PermissionGuard requiredPermissions={["address.create"]}>
                        <EditAddressesPage />
                    </PermissionGuard>
                </Suspense>
            },

        ]
    }
]