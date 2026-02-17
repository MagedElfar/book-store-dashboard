import LanguageIcon from "@mui/icons-material/Language";
import { IconButton, Tooltip, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

export function LanguageSwitch() {
    const { i18n } = useTranslation();

    const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

    const toggleLanguage = () => {
        const newLang = currentLang === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);

        // optional: save manually
        localStorage.setItem("i18nextLng", newLang);
    };

    return (
        <Tooltip title={currentLang === "en" ? "العربية" : "English"}>
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
                    }}
                >
                    {currentLang.toUpperCase()}
                </Box>
            </IconButton>
        </Tooltip>
    );
}
