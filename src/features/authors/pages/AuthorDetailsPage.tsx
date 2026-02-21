// src/features/authors/pages/AuthorDetailsPage.tsx

import CakeIcon from "@mui/icons-material/Cake";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";
import { Button, Card, CardContent, Divider, Grid, Stack, Typography, Avatar, Box, Chip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { DataHandler, DetailItem, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import type { SupportedLang } from "@/shared/types";
import { fDate } from "@/shared/utilities";

import { LoadingAuthorDetails } from "../components";
import { DeleteAuthorDialog } from "../components/DeleteAuthorDialog";
import { useGetAuthorById } from "../hooks";

export default function AuthorDetailsPage() {
    const { t, i18n } = useTranslation(["author", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { hasPermission } = usePermission();

    const { data: author, isLoading, isError, refetch } = useGetAuthorById(id!);
    const [openDelete, setOpenDelete] = useState(false);

    const lang = i18n.language as SupportedLang;

    return (
        <PageWrapper>
            <PageTitle
                title={t("authorDetails")}
                withBackArrow
                actions={
                    <Stack direction="row" spacing={1}>
                        {hasPermission("author.update") && (
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => navigate(paths.dashboard.authors.edit(id!))}
                            >
                                {t("common:actions.edit")}
                            </Button>
                        )}
                        {hasPermission("author.delete") && (
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
                data={author}
                onRetry={refetch}
                loadingComponent={<LoadingAuthorDetails />}
            >
                {(authorData) => (
                    <>
                        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
                            {/* Profile Card: Avatar & Status */}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Card sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    p: 3,
                                    borderRadius: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Avatar
                                        src={authorData.image_url || ""}
                                        alt={authorData.name_en}
                                        sx={{
                                            width: 140,
                                            height: 140,
                                            mx: 'auto',
                                            mb: 2,
                                            border: '4px solid #f4f6f8',
                                            boxShadow: (theme) => theme.shadows?.[1]
                                        }}
                                    />
                                    <Typography variant="h5" fontWeight="bold">
                                        {authorData?.[`name_${lang}`]}
                                    </Typography>
                                    <Box sx={{ mt: 1 }}>
                                        <Chip
                                            label={authorData.is_active ? t("status.active") : t("status.inactive")}
                                            color={authorData.is_active ? "success" : "default"}
                                            size="small"
                                        />
                                    </Box>
                                </Card>
                            </Grid>

                            {/* Details Card: Full Info */}
                            <Grid size={{ xs: 12, md: 8 }}>
                                <Card sx={{ height: '100%', borderRadius: 4 }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h6" sx={{ mb: 3 }}>
                                            {t("info.authorDetails")}
                                        </Typography>
                                        <Stack spacing={2.5}>
                                            <DetailItem
                                                icon={<LanguageIcon color="action" />}
                                                label={t("label.nameEn")}
                                                value={authorData.name_en}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<LanguageIcon color="action" />}
                                                label={t("label.nameAr")}
                                                value={authorData.name_ar}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<LinkIcon color="action" />}
                                                label={t("label.slug")}
                                                value={authorData.slug}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<CakeIcon color="action" />}
                                                label={t("label.birthDate")}
                                                value={authorData.birth_date ? fDate(authorData.birth_date) : "---"}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<DescriptionIcon color="action" />}
                                                label={t("label.bio")}
                                                value={(authorData?.[`bio_${lang}`]) || "---"}
                                            />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <DeleteAuthorDialog
                            open={openDelete}
                            authorId={authorData.id}
                            authorName={authorData?.[`name_${lang}`]}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.authors.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}