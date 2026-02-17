import {
    Drawer,
    Box,
    Avatar,
    Typography,
    Stack,
    Divider,
    useTheme, useMediaQuery
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthState } from "@/features/auth/hooks/useAuthState";
import type { NavItem } from "@/layouts/types";
import { filterNavByRole } from "@/layouts/utilities";
import { Logo } from "@/shared/components";

import {
    SIDEBAR_WIDTH,
    SIDEBAR_COLLAPSED_WIDTH
} from "../../constants";

import { NavList } from "./NavList";

interface Props {
    open: boolean
    onClose: () => void,
    rootPath?: string
    nav: NavItem[]
}


export function Sidebar({ open, onClose, nav, rootPath = "/" }: Props) {

    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthState()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const role = user?.role;

    const width = isMobile ? SIDEBAR_WIDTH : open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH;
    const navItems = filterNavByRole(nav, role);

    function handleNavigate(path?: string) {
        if (!path) return;

        navigate(path);

        if (isMobile)
            onClose();
    }

    return (
        <Drawer
            aria-label="Sidebar navigation"
            variant={isMobile ? "temporary" : "permanent"}
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                width,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width,
                    transition: "width 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    overflow: "hidden",
                    bgcolor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[50]
                            : theme.palette.grey[900],

                    borderRight: "1px solid",
                    borderColor: "divider",
                },
            }}
        >

            {/* Header */}
            <Stack
                component="header"
                direction="row"
                justifyContent={open ? "flex-start" : "center"}
                spacing={2}
                sx={{
                    opacity: 0.8,
                    p: 2
                }}
            >
                <Logo width={36} height={36} sx={{ "& .img": { maxWidth: "unset" } }} />
            </Stack>

            <Divider sx={{ width: "100%" }} />

            {/* Navigation */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    }
                }}
            >
                <NavList
                    items={navItems}
                    open={open}
                    pathname={location.pathname}
                    onNavigate={handleNavigate}
                    rootPath={rootPath}

                />
            </Box>
            <Divider sx={{ width: "100%" }} />
            {/* Push bottom section down */}

            {user && <Stack
                component="footer"
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                    justifyContent: open ? "flex-start" : "center",
                    p: 2,
                }}
            >
                <Avatar
                    src={user?.avatar_url || ""}
                    alt={user?.full_name}
                    sx={{ width: 36, height: 36, textTransform: "uppercase", fontSize: "14px" }}

                >
                    {user?.full_name.slice(0, 2)}
                </Avatar>

                {open && (
                    <Box>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            textTransform="capitalize"
                        >
                            {user?.full_name}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"

                        >
                            {user.email}
                        </Typography>
                    </Box>
                )}
            </Stack>
            }
        </Drawer>
    );
}
