import { Box } from "@mui/material";
import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { AuthStateContext } from "@/features/auth/context/AuthStateContext";
import { paths } from "@/shared/constants";

import { SplashScreen } from "../feedback";


interface Props {
    redirectTo?: string;
    children: ReactNode
}

export function ProtectedRoute({ redirectTo = paths.auth.login, children }: Props) {
    const authState = useContext(AuthStateContext);

    if (authState?.isLoading) {
        return <Box height="100vh" width="100%">
            <SplashScreen withLogo />
        </Box>;
    }

    if (!authState?.isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
