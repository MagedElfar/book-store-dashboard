import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Stack, Typography, type TypographyProps } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface Props extends TypographyProps<"h1"> {
    title?: string;
    withBackArrow?: boolean;
    actions?: React.ReactNode;
    nested?: boolean
}

export function PageTitle({ title, withBackArrow, actions, nested, ...props }: Props) {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const isRtl = i18n.dir() === "rtl";

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ md: title ? "space-between" : "flex-end" }}
            alignItems={{ md: "center" }}
            spacing={1}
        >
            {title && <Stack direction="row" alignItems="center" spacing={0.5}>
                {withBackArrow && (
                    <IconButton
                        onClick={() => navigate(-1)}
                        size="small"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isRtl ? (
                            <ArrowForwardIosIcon fontSize="inherit" sx={{ width: 18, height: 18 }} />
                        ) : (
                            <ArrowBackIosIcon fontSize="inherit" sx={{ width: 18, height: 18 }} />
                        )}
                    </IconButton>
                )}

                <Typography
                    {...props}
                    component={nested ? "h2" : "h1"}
                    variant={nested ? "h2" : "h1"}
                    sx={{
                        fontWeight: 'bold',
                        ...props.sx
                    }}
                >
                    {title}
                </Typography>
            </Stack>}

            {actions && (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    flexWrap="wrap"
                    spacing={1}
                    sx={{ flexShrink: 0 }}
                >
                    {actions}
                </Stack>
            )}
        </Stack>
    );
}