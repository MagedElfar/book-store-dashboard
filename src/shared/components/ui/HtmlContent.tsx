import { Box, type BoxProps } from "@mui/material";
import DOMPurify from "dompurify";

interface Props extends BoxProps {
    html: string;
}

export function HtmlContent({ html, sx, ...other }: Props) {

    return (
        <Box
            {...other}
            sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                wordBreak: 'break-word',
                '& p': {
                    mb: 1.5,
                    whiteSpace: "pre-wrap"
                },
                '& ul, & ol': {
                    ml: 3,
                    mb: 2,
                    '& li': { mb: 0.5 }
                },

                '& a': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                    '&:hover': { color: 'primary.dark' }
                },

                '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    my: 1
                },

                '& table': {
                    width: '100%',
                    borderCollapse: 'collapse',
                    mb: 2,
                    '& th, & td': {
                        border: '1px solid',
                        borderColor: 'divider',
                        p: 1,
                        textAlign: 'inherit'
                    }
                },
                ...sx
            }}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(html)
            }}
        />
    );
}