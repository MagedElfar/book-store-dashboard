import RoadIcon from "@mui/icons-material/AddRoad";
import EmailIcon from "@mui/icons-material/Email";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedIcon from '@mui/icons-material/Verified';
import { Card, CardContent, Typography, Stack, Box, Divider, useTheme, useMediaQuery, Chip, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

import { COUNTRIES } from "@/shared/constants";

import type { Order } from "../../types";

interface Props {
    order: Order;
}

export function OrderCustomerInfo({ order }: Props) {
    const { t } = useTranslation(["order", "common"]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const countryName = COUNTRIES
        .find(c => c.value === order.shipping_details.country)
        ?.label;

    return (
        <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
                <Stack
                    direction={{ md: "row", xs: "column" }}
                    spacing={{ xs: 3, md: 3 }}
                    divider={
                        <Divider
                            orientation={isMobile ? "horizontal" : "vertical"}
                            flexItem
                            sx={{ opacity: 0.6 }}
                        />
                    }
                >
                    <Stack spacing={2.5} flex={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={1.5} color="primary.main">
                                <Box sx={{ bgcolor: 'primary.lighter', p: 0.8, borderRadius: 1.5, display: 'flex' }}>
                                    <PersonIcon fontSize="small" />
                                </Box>
                                <Typography variant="subtitle1" fontWeight="700">
                                    {t("customer_info")}
                                </Typography>
                            </Stack>

                            {order.user ? (
                                <Chip
                                    icon={<VerifiedIcon style={{ fontSize: 16, color: 'inherit' }} />}
                                    label={t("order:user_types.registered")}
                                    size="small"
                                    color="success"
                                    component="a"
                                    href={`/dashboard/users/${order.user.id}`}
                                    target="_blank"
                                    clickable
                                    sx={{ fontWeight: 700, cursor: 'pointer' }}
                                />
                            ) : (
                                <Chip
                                    label={t("order:user_types.guest")}
                                    size="small"
                                    sx={{ fontWeight: 700 }}
                                />
                            )}
                        </Stack>

                        <Stack spacing={2}>
                            <InfoRow
                                title={t("fields.customer_name")}
                                icon={<PersonIcon sx={{ fontSize: 16 }} />}
                                text={order.customer_name}
                                // إذا كان مستخدم مسجل، نجعل الاسم رابطاً أيضاً
                                href={order.user ? `/dashboard/users/${order.user.id}` : undefined}
                            />
                            <InfoRow
                                title={t("fields.customer_email")}
                                icon={<EmailIcon sx={{ fontSize: 16 }} />}
                                text={order.customer_email}
                            />
                            <InfoRow
                                title={t("fields.customer_phone")}
                                icon={<PhoneIcon sx={{ fontSize: 16 }} />}
                                text={order.customer_phone}
                            />
                        </Stack>
                    </Stack>

                    {/* قسم تفاصيل الشحن */}
                    <Stack spacing={2.5} flex={1}>
                        <Stack direction="row" alignItems="center" spacing={1.5} color="primary.main">
                            <Box sx={{ bgcolor: 'primary.lighter', p: 0.8, borderRadius: 1.5, display: 'flex' }}>
                                <LocalShippingIcon fontSize="small" />
                            </Box>
                            <Typography variant="subtitle1" fontWeight="700">
                                {t("shipping_details")}
                            </Typography>
                        </Stack>

                        <Stack spacing={2}>
                            <InfoRow
                                title={t("fields.address")}
                                icon={<RoadIcon sx={{ fontSize: 16 }} />}
                                text={order.shipping_details.street_address || "---"}
                            />
                            <InfoRow
                                title={t("fields.city")}
                                icon={<LocationCityIcon sx={{ fontSize: 16 }} />}
                                text={order.shipping_details.city || "---"}
                                extra={order.shipping_details.state}
                            />
                            <InfoRow
                                title={t("fields.country")}
                                icon={<PublicIcon sx={{ fontSize: 16 }} />}
                                text={countryName ? t(`common:${countryName}`) : order.shipping_details.country}
                                extra={order.shipping_details.postal_code}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

function InfoRow({ icon, title, text, extra, href }: {
    icon: React.ReactNode,
    title: string,
    text: string | number,
    extra?: string,
    href?: string
}) {
    return (
        <Stack direction="column" spacing={0.8} alignItems="flex-start">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                <Box sx={{ display: 'flex', opacity: 0.8 }}>{icon}</Box>
                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {title}
                </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ pl: 3.2 }}>
                {href ? (
                    <Link
                        href={href}
                        target="_blank"
                        color="primary.main"
                        underline="hover"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 600,
                            typography: 'body2'
                        }}
                    >
                        {text}
                        <OpenInNewIcon sx={{ ml: 0.5, fontSize: 14 }} />
                    </Link>
                ) : (
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
                        {text || "---"}
                    </Typography>
                )}

                {extra && (
                    <Typography
                        component="span"
                        variant="caption"
                        sx={{
                            ml: 1,
                            color: 'primary.main',
                            bgcolor: 'primary.lighter',
                            px: 0.8,
                            py: 0.2,
                            borderRadius: 0.8,
                            fontWeight: 700,
                            fontSize: '10px'
                        }}
                    >
                        {extra}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
}