import { Box } from "@mui/material";
import { useContext, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthStateContext } from "@/features/auth/context/AuthStateContext";
import { paths } from "@/shared/constants";

import { SplashScreen } from "../feedback";


interface Props {
    redirectTo?: string;
    children: ReactNode
}

export function PublicRoute({ redirectTo = paths.dashboard.home, children }: Props) {

    const pathName = useLocation()?.pathname
    const authState = useContext(AuthStateContext);

    if (pathName.includes(paths.auth.restPassword))
        return <>{children}</>;

    if (authState?.isLoading) {
        return <Box height="100vh" width="100%">
            <SplashScreen withLogo />
        </Box>;
    }

    if (authState?.isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
