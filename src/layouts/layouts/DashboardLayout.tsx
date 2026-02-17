import { Box, useTheme, useMediaQuery, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Container } from "@/shared/components";

import { Sidebar, Header } from "../components";
import { dashboardNav } from "../config";


export function DashboardLayout() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(!isMobile)
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>

      <Sidebar open={open} onClose={() => setOpen(false)} nav={dashboardNav} />

      <Stack sx={{ flexGrow: 1, position: "relative" }}>

        <Header onToggleBar={() => setOpen(prev => !prev)} open={open} />

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Container>
            <Outlet />
          </Container>
        </Box>

      </Stack>

    </Box>
  );
}
