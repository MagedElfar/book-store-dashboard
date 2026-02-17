import { Box, Stack, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import { LanguageSwitch, ModeSwitch } from "../components";


export function AuthLayout() {
    const theme = useTheme()
    return (
        <Box
            width="100%"
            minHeight="100vh"
            alignItems="center"
            bgcolor={theme.palette.background.paper}
            sx={{
                p: 2,
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto 1fr",
                rowGap: 2
            }}
        >
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
                sx={{
                    width: "100%",
                }}
            >
                <LanguageSwitch />
                <ModeSwitch />
            </Stack>
            <Outlet />
        </Box>
    )
}
