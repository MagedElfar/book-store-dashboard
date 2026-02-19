import { Box } from "@mui/material";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuthState, type Role } from "@/features/auth";
import { paths } from "@/shared/constants";

import { SplashScreen } from "../feedback";


interface Props {
    children: ReactNode;
    allowedRoles: Role[];
    redirectTo?: string;
}

export function RoleGuard({
    children,
    allowedRoles,
    redirectTo = paths.forbidden, // create later
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
        return (
            <Navigate
                to={paths.auth.login}
                replace
            />
        );
    }

    if (!allowedRoles.includes(authState.role)) {
        return (
            <Navigate
                to={redirectTo}
                replace
            />
        );
    }

    return <>{children}</>;
}
