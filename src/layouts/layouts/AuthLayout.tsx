import { Box, Stack, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Container } from "@/shared/components";

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
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto 1fr",
                rowGap: 2,
            }}
        >
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
                sx={{
                    width: "100%",
                    p: 2,
                }}
            >
                <LanguageSwitch />
                <ModeSwitch />
            </Stack>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Container maxWidth="xs">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    )
}
