import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";

import { PermissionGuard, SplashScreen } from "@/shared/components";

const CreateOrderPage = lazy(() => import("./pages/CreateOrderPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));

export const ordersRoutes: RouteObject[] = [
    {
        path: "orders",
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["order.read"]}>
                            <OrdersPage />
                        </PermissionGuard>
                    </Suspense>
                ),
            },
            {
                path: "create",
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["order.manage"]}>
                            <CreateOrderPage />
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
                                <PermissionGuard requiredPermissions={["order.read"]}>
                                    <OrderDetailsPage />
                                </PermissionGuard>
                            </Suspense>
                        ),
                    }
                ],
            },
        ],
    },
];