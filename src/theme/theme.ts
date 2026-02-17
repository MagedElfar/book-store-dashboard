import { createTheme } from '@mui/material/styles';

export const createAppTheme = (direction: 'ltr' | 'rtl' = 'ltr') =>
    createTheme({
        direction,
        typography: {
            fontFamily: "'Inter', 'Cairo', sans-serif",

            h1: {
                fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.2,
            },

            h2: {
                fontSize: "clamp(1.5rem, 2vw, 2rem)",
                fontWeight: 600,
                lineHeight: 1.3,
            },

            h3: {
                fontSize: "clamp(1.25rem, 1.5vw, 1.5rem)",
                fontWeight: 600,
                lineHeight: 1.4,
            },

            body1: {
                fontSize: "1rem",
                lineHeight: 1.6,
            },

            body2: {
                fontSize: "0.875rem",
                lineHeight: 1.6,
                opacity: 0.8,
            },
        },
        colorSchemes: {
            dark: true,
        },
    });

