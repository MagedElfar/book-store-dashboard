
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";
import LabelIcon from "@mui/icons-material/Label";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import {
    Button, Card, CardContent, Divider, Grid, Stack, Typography,
    Avatar, Box, Chip, Rating
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { usePermission } from "@/features/auth";
import { DataHandler, DetailItem, HtmlContent, ImageGallery, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import type { SupportedLang } from "@/shared/types";
import { formatPrice } from "@/shared/utilities";

import { LoadingBookDetails, DeleteBookDialog } from "../components";
import { useGetBookById } from "../hooks";

export default function BookDetailsPage() {
    const { t, i18n } = useTranslation(["book", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { hasPermission } = usePermission();

    const { data: book, isLoading, isError, refetch } = useGetBookById(id!);
    const [openDelete, setOpenDelete] = useState(false);

    const lang = i18n.language as SupportedLang;

    const descriptionHtml = book?.[`description_${lang}`];

    return (
        <PageWrapper>
            <PageTitle
                title={t("bookDetails")}
                withBackArrow
                actions={
                    <Stack direction="row" spacing={1}>
                        {hasPermission("book.update") && (
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => navigate(paths.dashboard.books.edit(id!))}
                            >
                                {t("common:actions.edit")}
                            </Button>
                        )}
                        {hasPermission("book.delete") && (
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
                data={book}
                onRetry={refetch}
                loadingComponent={<LoadingBookDetails />}
            >
                {(bookData) => (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4 }} >
                            <Stack spacing={3}>
                                <Card sx={{ p: 3, textAlign: 'center', borderRadius: 4 }}>
                                    {(bookData.book_images && Number(book?.book_images?.length) > 0) ?
                                        <ImageGallery
                                            mainImage={bookData.cover_image || bookData.book_images[0].image_url}
                                            additionalImages={bookData.book_images}
                                            aspectRatio="3/4"
                                        /> :
                                        <Avatar
                                            src={bookData.cover_image || ""}
                                            alt={bookData.title_en}
                                            variant="rounded"
                                            sx={{
                                                width: '100%',
                                                height: 320,
                                                borderRadius: 2,
                                                mb: 2,
                                                objectFit: 'contain',
                                                bgcolor: 'background.neutral',
                                                "& img": {
                                                    objectFit: 'contain',
                                                }
                                            }}
                                        />
                                    }
                                    <Typography variant="h5" fontWeight="bold">
                                        {bookData?.[`title_${lang}`]}
                                    </Typography>

                                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                                        <Rating value={bookData.average_rating} readOnly size="small" precision={0.5} />
                                        <Typography variant="caption">({bookData.total_reviews})</Typography>
                                    </Stack>

                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h4" color="primary.main" fontWeight="800">
                                            {formatPrice(bookData.sale_price || bookData.price, lang)}
                                        </Typography>
                                        {bookData.sale_price && (
                                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                                                {formatPrice(bookData.price, lang)}
                                            </Typography>
                                        )}
                                    </Box>
                                </Card>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, md: 8 }} >
                            <Stack spacing={3}>
                                <Card sx={{ p: 2, borderRadius: 4 }}>
                                    <Stack spacing={1.5}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <PersonIcon color="primary" fontSize="small" />
                                            <Typography variant="subtitle2" color="text.secondary">
                                                {t("label.authors")}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                            {bookData.authors && bookData.authors.length > 0 ? (
                                                bookData.authors.map((author) => (
                                                    <Chip
                                                        key={author.id}
                                                        label={author?.[`name_${lang}`]}
                                                        size="small"
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() => navigate(paths.dashboard.authors.details(author.id))}
                                                        sx={{
                                                            fontWeight: 500,
                                                            cursor: 'pointer',
                                                            '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' }
                                                        }}
                                                    />
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                                                    {t("common:unknown")}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Stack>
                                </Card>
                                <Card sx={{ borderRadius: 4 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <DescriptionIcon fontSize="small" /> {t("label.description")}
                                        </Typography>
                                        {descriptionHtml ? (
                                            <HtmlContent html={descriptionHtml} />
                                        ) : (
                                            <Typography variant="body2" color="text.disabled">
                                                {t("noDescription")}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card sx={{ borderRadius: 4 }}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, md: 6 }} >
                                                <DetailItem icon={<InventoryIcon />} label={t("label.stock")} value={`${bookData.stock} ${t("label.unit")}`} />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }} >
                                                <DetailItem
                                                    icon={<MenuBookIcon />}
                                                    label={t("label.pages")} value={bookData.pages?.toString() || "0"}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }} >
                                                <DetailItem icon={<LanguageIcon />} label={t("label.publisher")} value={bookData.publisher || "---"} />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }} >
                                                <DetailItem
                                                    icon={<CalendarMonthIcon />}
                                                    label={t("label.publishedYear")}
                                                    value={bookData.published_year?.toString() || "---"} />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }} >
                                                <DetailItem icon={<LinkIcon />} label={t("label.sku")} value={bookData.sku} />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }} >
                                                <DetailItem icon={<LabelIcon />} label={t("label.isbn")} value={bookData.isbn || "---"} />
                                            </Grid>
                                        </Grid>

                                        <Divider sx={{ my: 2 }} />

                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom>{t("label.categories")}
                                        </Typography>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                            useFlexGap
                                        >
                                            {bookData.categories?.map((cat) => (
                                                <Chip key={cat.id} label={cat?.[`name_${lang}`]} size="small" variant="outlined" />
                                            ))}
                                        </Stack>

                                        <Divider sx={{ my: 2 }} />

                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom>
                                            {t("label.tags")}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                            useFlexGap
                                        >
                                            {bookData.tags?.length ? (
                                                bookData.tags.map((tag) => (
                                                    <Chip
                                                        key={tag.id}
                                                        label={tag?.[`name_${lang}`]}
                                                        size="small"
                                                        color="secondary"
                                                        variant="outlined"
                                                    />
                                                ))
                                            ) : (
                                                <Typography variant="caption" color="text.secondary">
                                                    {t("common:noData")}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>



                    </Grid>
                )}
            </DataHandler>

            <DeleteBookDialog
                open={openDelete}
                bookId={id!}
                bookTitle={book?.[`title_${lang}`]}
                onClose={() => setOpenDelete(false)}
                onRedirect={() => navigate(paths.dashboard.books.root)}
            />
        </PageWrapper>
    );
}