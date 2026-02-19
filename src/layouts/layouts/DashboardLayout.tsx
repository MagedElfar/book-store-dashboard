import { Box, useTheme, useMediaQuery, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Container } from "@/shared/components";
import { paths } from "@/shared/constants";

import { Sidebar, Header } from "../components";
import { dashboardNav } from "../config";


export function DashboardLayout() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(!isMobile)

  return (
    <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>

      <Sidebar
        open={open}
        onClose={() => setOpen(false)} nav={dashboardNav}
        rootPath={paths.dashboard.root}
      />

      <Stack sx={{ flexGrow: 1, position: "relative", overflowX: "hidden" }}>

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
