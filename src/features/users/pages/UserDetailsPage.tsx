import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { Button, Card, CardContent, Divider, Grid, Stack, Typography, Avatar, Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import { fDate } from "@/shared/utilities";

import { DeleteUserDialog, LoadingUserDetails } from "../components";
import { useGetUserById } from "../hooks";

export default function UserDetailsPage() {
    const { t } = useTranslation(["user", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { hasPermission } = usePermission();

    const { data: user, isLoading, isError, refetch } = useGetUserById(id!);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <PageWrapper>
            <PageTitle
                withBackArrow
                actions={
                    <Stack direction="row" spacing={1}>
                        {hasPermission("user.update") && (
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => navigate(paths.dashboard.users.edit(id!))}
                            >
                                {t("common:actions.edit")}
                            </Button>
                        )}
                        {hasPermission("user.delete") && (
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => setOpenDelete(true)}
                            >
                                {t("common:actions.delete")}
                            </Button>
                        )}
                    </Stack>
                }
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={user}
                onRetry={refetch}
                loadingComponent={<LoadingUserDetails />}
            >
                {(userData) => (
                    <>
                        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Card sx={{
                                    height: '100%', // لملء ارتفاع الـ Grid
                                    textAlign: 'center',
                                    p: 3,
                                    borderRadius: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Avatar
                                        src={userData.avatar_url || ""}
                                        alt={userData.full_name}
                                        sx={{ width: 140, height: 140, mx: 'auto', mb: 2, fontSize: '3.5rem', border: '4px solid #f4f6f8' }}
                                    />
                                    <Typography variant="h5" textTransform="capitalize" fontWeight="bold">
                                        {userData.full_name}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'medium' }}>
                                        {t(`role.${userData.role}`)}
                                    </Typography>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 8 }}>
                                <Card sx={{ height: '100%', borderRadius: 4 }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h6" sx={{ mb: 3 }}>
                                            {t("info.personalDetails")}
                                        </Typography>
                                        <Stack spacing={2.5}>
                                            <DetailItem
                                                icon={<PersonIcon color="action" />}
                                                label={t("label.fullName")}
                                                value={userData.full_name}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<EmailIcon color="action" />}
                                                label={t("label.email")}
                                                value={userData.email}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<PhoneIcon color="action" />}
                                                label={t("label.phone")}
                                                value={userData.phone || "---"}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<CalendarMonthIcon color="action" />}
                                                label={t("table.createdAt")}
                                                value={fDate(userData.created_at)}
                                            />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <DeleteUserDialog
                            open={openDelete}
                            userId={userData.id}
                            userName={userData.full_name}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.users.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}

function DetailItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{
                p: 1,
                borderRadius: 1.5,
                bgcolor: 'action.hover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.2 }}>
                    {label}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}