import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";

import { PermissionGuard, SplashScreen } from "@/shared/components";

const CreateOrderPage = lazy(() => import("./pages/CreateOrderPage"));

export const ordersRoutes: RouteObject[] = [
    {
        path: "orders",
        children: [
            // {
            //     index: true,
            //     element: (
            //         <Suspense fallback={<SplashScreen />}>
            //             <PermissionGuard requiredPermissions={["book.read"]}>
            //                 <BooksPage />
            //             </PermissionGuard>
            //         </Suspense>
            //     ),
            // },
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
            // {
            //     path: ":id",
            //     children: [
            //         {
            //             index: true,
            //             element: (
            //                 <Suspense fallback={<SplashScreen />}>
            //                     <PermissionGuard requiredPermissions={["book.read"]}>
            //                         <BookDetailsPage />
            //                     </PermissionGuard>
            //                 </Suspense>
            //             ),
            //         },
            //         {
            //             path: "edit",
            //             element: (
            //                 <Suspense fallback={<SplashScreen />}>
            //                     <PermissionGuard requiredPermissions={["book.update"]}>
            //                         <EditBookPage />
            //                     </PermissionGuard>
            //                 </Suspense>
            //             ),
            //         },
            //     ],
            // },
        ],
    },
];