import { Box, useTheme, useMediaQuery, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Container } from "@/shared/components";
import { paths } from "@/shared/constants";

import { Sidebar, Header } from "../components";
import { profileNav } from "../config/profile.navigation.config";


export function ProfileLayout() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(!isMobile)
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        nav={profileNav}
        rootPath={paths.account.root}
      />

      <Stack sx={{ flexGrow: 1, position: "relative" }}>

        <Header onToggleBar={() => setOpen(prev => !prev)} open={open} />

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Container maxWidth="md">
            <Outlet />
          </Container>
        </Box>

      </Stack>

    </Box>
  );
}
