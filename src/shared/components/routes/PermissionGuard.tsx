import { Box } from "@mui/material";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuthState, type Permission } from "@/features/auth";
import { paths } from "@/shared/constants";

import { SplashScreen } from "../feedback";

interface Props {
    children: ReactNode;
    requiredPermissions: Permission[];
    redirectTo?: string;
}

export function PermissionGuard({
    children,
    requiredPermissions,
    redirectTo = paths.forbidden,
}: Props) {
    const authState = useAuthState();

    if (!authState || authState.isLoading) {
        return (
            <Box height="100vh">
                <SplashScreen withLogo />
            </Box>
        );
    }

    if (!authState.isAuthenticated) {
        return <Navigate to={paths.auth.login} replace />;
    }

    // convert permissions to Set for faster lookup
    const permissionSet = new Set(authState.permissions);

    // check if user has all required permissions
    const hasPermission = requiredPermissions.every(p => permissionSet.has(p));

    if (!hasPermission) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
}
