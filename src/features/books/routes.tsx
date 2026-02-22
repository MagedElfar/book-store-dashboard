import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router";

import { PermissionGuard, SplashScreen } from "@/shared/components";

const BooksPage = lazy(() => import("./pages/BooksPage"));
const CreateBookPage = lazy(() => import("./pages/CreateBookPage"));
const EditBookPage = lazy(() => import("./pages/EditBookPage"));


export const booksRoutes: RouteObject[] = [
    {
        path: "books",
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["book.read"]}>
                            <BooksPage />
                        </PermissionGuard>
                    </Suspense>
                ),
            },
            {
                path: "create",
                element: (
                    <Suspense fallback={<SplashScreen />}>
                        <PermissionGuard requiredPermissions={["book.create"]}>
                            <CreateBookPage />
                        </PermissionGuard>
                    </Suspense>
                ),
            },
            {
                path: ":id",
                children: [
                    // {
                    //     index: true,
                    //     element: (
                    //         <Suspense fallback={<SplashScreen />}>
                    //             <PermissionGuard requiredPermissions={["category.read"]}>
                    //                 <CategoryDetailsPage />
                    //             </PermissionGuard>
                    //         </Suspense>
                    //     ),
                    // },
                    {
                        path: "edit",
                        element: (
                            <Suspense fallback={<SplashScreen />}>
                                <PermissionGuard requiredPermissions={["book.update"]}>
                                    <EditBookPage />
                                </PermissionGuard>
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];