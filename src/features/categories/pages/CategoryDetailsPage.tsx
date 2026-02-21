import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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

import { LoadingCategoryDetails } from "../components";
import { DeleteCategoryDialog } from "../components/DeleteCategoryDialog";
import { useGetCategoryById } from "../hooks";

export default function CategoryDetailsPage() {
    const { t, i18n } = useTranslation(["category", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { hasPermission } = usePermission();

    const { data: category, isLoading, isError, refetch } = useGetCategoryById(id!);
    const [openDelete, setOpenDelete] = useState(false);

    const lang = i18n.language as SupportedLang;

    return (
        <PageWrapper>
            <PageTitle
                title={t("categoryDetails")}
                withBackArrow
                actions={
                    <Stack direction="row" spacing={1}>
                        {hasPermission("category.update") && (
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => navigate(paths.dashboard.categories.edit(id!))}
                            >
                                {t("common:actions.edit")}
                            </Button>
                        )}
                        {hasPermission("category.delete") && (
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
                data={category}
                onRetry={refetch}
                loadingComponent={<LoadingCategoryDetails />}
            >
                {(categoryData) => (
                    <>
                        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
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
                                        src={categoryData.image_url || ""}
                                        alt={categoryData.name_en}
                                        variant="rounded"
                                        sx={{ width: 140, height: 140, mx: 'auto', mb: 2, borderRadius: 3, border: '4px solid #f4f6f8' }}
                                    />
                                    <Typography variant="h5" fontWeight="bold">
                                        {categoryData?.[`name_${lang}`]}
                                    </Typography>
                                    <Box sx={{ mt: 1 }}>
                                        <Chip
                                            label={categoryData.is_active ? t("status.active") : t("status.inactive")}
                                            color={categoryData.is_active ? "success" : "default"}
                                            size="small"
                                        />
                                    </Box>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 8 }}>
                                <Card sx={{ height: '100%', borderRadius: 4 }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h6" sx={{ mb: 3 }}>
                                            {t("info.categoryDetails")}
                                        </Typography>
                                        <Stack spacing={2.5}>
                                            <DetailItem
                                                icon={<LanguageIcon color="action" />}
                                                label={t("label.nameEn")}
                                                value={categoryData.name_en}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<LanguageIcon color="action" />}
                                                label={t("label.nameAr")}
                                                value={categoryData.name_ar}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<LinkIcon color="action" />}
                                                label={t("label.slug")}
                                                value={categoryData.slug}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<DescriptionIcon color="action" />}
                                                label={t("label.description")}
                                                value={(categoryData?.[`description_${lang}`]) || "---"}
                                            />
                                            <Divider variant="middle" />
                                            <DetailItem
                                                icon={<CalendarMonthIcon color="action" />}
                                                label={t("table.createdAt")}
                                                value={fDate(categoryData.created_at)}
                                            />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <DeleteCategoryDialog
                            open={openDelete}
                            categoryId={categoryData.id}
                            categoryName={categoryData?.[`name_${lang}`]}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.categories.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}
