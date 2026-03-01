import LanguageIcon from "@mui/icons-material/Language";
import { IconButton, Tooltip, Box } from "@mui/material";
import { motion } from "framer-motion";

import { useLocalize } from "@/shared/lib";

const MotionBox = motion(Box);

export function LanguageSwitch() {
    const { lang, toggleLanguage } = useLocalize();

    return (
        <Tooltip title={lang === "en" ? "العربية" : "English"}>
            <IconButton
                component={MotionBox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                sx={{
                    width: 59,
                    height: 30,
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                    backgroundColor: (theme) =>
                        theme.palette.action.selected,
                    border: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                    transition: "0.3s",

                    "&:hover": {
                        backgroundColor: (theme) =>
                            theme.palette.action.hover,
                    },
                }}
            >
                <LanguageIcon fontSize="small" />

                {/* language text */}
                <Box
                    component="span"
                    sx={{
                        fontSize: 11,
                        fontWeight: 700,
                        ml: 0.5,
                        textTransform: "uppercase"
                    }}
                >
                    {lang}
                </Box>
            </IconButton>
        </Tooltip>
    );
}
