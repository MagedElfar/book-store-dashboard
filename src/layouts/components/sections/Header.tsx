import {
    Menu as MenuIcon,
    ChevronLeft,
    ChevronRight
} from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AccountDropdown } from "@/features/auth";
import { HEADER_HEIGHT } from "@/layouts/constants";

import { ModeSwitch, LanguageSwitch } from "../ui";



interface Props {
    onToggleBar: () => void,
    open: boolean
}

export function Header({ onToggleBar, open }: Props) {
    const { i18n } = useTranslation()

    const dir = i18n.dir()

    return <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={(theme) => ({
            position: "sticky",
            top: 0,
            height: HEADER_HEIGHT,
            p: 2,

            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",

            backgroundColor:
                theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.75)"
                    : "rgba(18,18,18,0.75)",

            borderBottom: "1px solid",
            borderColor: "divider",

            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",

            zIndex: theme.zIndex.appBar,
        })}

    >
        <Box
            sx={{
                display: "flex",
                p: 1
            }}
        >
            <IconButton onClick={onToggleBar}>
                {open ? dir === "ltr" ? <ChevronLeft /> : <ChevronRight /> : <MenuIcon />}
            </IconButton>
        </Box>

        <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
        >
            <ModeSwitch />
            <LanguageSwitch />
            <AccountDropdown />
        </Stack>

    </Stack>

}
