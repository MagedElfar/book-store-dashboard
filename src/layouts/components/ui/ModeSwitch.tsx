import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, useTheme, Tooltip, useColorScheme } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ModeSwitch() {

    const { t } = useTranslation("common")
    const { mode, setMode } = useColorScheme()
    const theme = useTheme();

    const isDark = mode === "dark";

    return (
        <Tooltip title={isDark ? t("lightMode") : t("darkMode")}>
            <IconButton
                component={motion.button}
                onClick={() => setMode(isDark ? "light" : "dark")}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backdropFilter: "blur(10px)",
                    backgroundColor: theme.palette.action.selected,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[2],
                    transition: "all 0.3s ease",

                    "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                        boxShadow: theme.shadows[4],
                    },
                }}
            >

                {isDark ? (
                    <LightMode fontSize="small" sx={{ color: "#FDB813" }} />
                ) : (
                    <DarkMode fontSize="small" sx={{ color: "#5A6ACF" }} />
                )}
            </IconButton>
        </Tooltip>
    );
}
