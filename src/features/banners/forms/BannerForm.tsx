// src/features/banners/components/BannerForm.tsx

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Typography, Divider, Paper, Box } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { paths } from '@/shared/constants';
import { FormContainer, FormTextField, AppFormProvider, FormColorField, FormSelectField, FormCheckbox, FormSliderField } from '@/shared/form';
import { DropzoneField } from '@/shared/media';
import { errorMapper } from '@/shared/utilities';

import { BannerPreview } from '../components';
import { useCreateBanner, useUpdateBanner } from '../hooks';
import { BannerFormSchema, type BannerFormSchemaType } from '../schema';
import type { Banner, CreateBannerPayload, UpdateBannerPayload } from '../types';

interface Props {
    banner?: Banner;
}

export function BannerForm({ banner }: Props) {
    const { t } = useTranslation("banner");
    const { mutateAsync: createBanner } = useCreateBanner();
    const { mutateAsync: updateBanner } = useUpdateBanner();
    const navigate = useNavigate();

    const defaultValues: BannerFormSchemaType = {
        title_ar: banner?.title_ar || "",
        title_en: banner?.title_en || "",
        description_ar: banner?.description_ar || "",
        description_en: banner?.description_en || "",
        button_text_ar: banner?.button_text_ar || "",
        button_text_en: banner?.button_text_en || "",
        image_url: banner?.image_url || null,
        link_url: banner?.link_url || "",
        vertical_pos: banner?.vertical_pos || "middle",
        horizontal_pos: banner?.horizontal_pos || "center",
        text_color: banner?.text_color || "#ffffff",
        btn_color: banner?.btn_color || "#ffffff",
        btn_bg_color: banner?.btn_bg_color || "#3b82f6",
        overlay_opacity: banner?.overlay_opacity ?? 40,
        // priority: banner?.priority || 1,
        is_active: banner?.is_active ?? true,
    };

    const methods = useForm<BannerFormSchemaType>({
        resolver: zodResolver(BannerFormSchema(t)),
        defaultValues,
    });

    const { control } = methods;

    const watchedValues = useWatch({ control });

    const onsubmit = async (data: BannerFormSchemaType) => {
        try {
            if (banner) {
                await updateBanner({ id: banner.id, data: data as UpdateBannerPayload });
                toast.success(t("feedback.successUpdateBanner"));
            } else {
                await createBanner(data as CreateBannerPayload);
                toast.success(t("feedback.successCreateBanner"));
            }
            navigate(paths.dashboard.banners.root);
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<BannerFormSchemaType> methods={methods} onSubmit={onsubmit}>
            <Grid container spacing={3}>

                <Grid size={{ xs: 12, xl: 7 }}>
                    <FormContainer
                        stackProps={{ alignItems: "center" }}
                        submitText={banner ? t("actions.editBanner") : t("actions.createBanner")}
                    >
                        <Grid container spacing={2}>

                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                                    {t("bannerDetails")}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormTextField name="title_en" label={t("label.titleEn")} required />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormTextField name="title_ar" label={t("label.titleAr")} required />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormTextField name="description_en" label={t("label.descriptionEn")} multiline rows={2} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormTextField name="description_ar" label={t("label.descriptionAr")} multiline rows={2} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormTextField name="button_text_en" label={t("label.buttonTextEn")} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormTextField name="button_text_ar" label={t("label.buttonTextAr")} />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Divider sx={{ my: 1 }} />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                                    {t("label.position")} & {t("label.textColor")}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 6 }} >
                                <FormSelectField
                                    name="vertical_pos"
                                    label="Vertical"
                                    options={[
                                        { label: t("position.top"), value: "top" },
                                        { label: t("position.middle"), value: "middle" },
                                        { label: t("position.bottom"), value: "bottom" },
                                    ]}
                                />
                            </Grid>
                            <Grid size={{ xs: 6 }} >
                                <FormSelectField
                                    name="horizontal_pos"
                                    label="Horizontal"
                                    options={[
                                        { label: t("position.start"), value: "start" },
                                        { label: t("position.center"), value: "center" },
                                        { label: t("position.end"), value: "end" },
                                    ]}
                                />
                            </Grid>

                            {/* <Grid size={{ xs: 12, md: 6 }} >
                                <FormTextField name="priority" label={t("label.priority")} type="number" />
                            </Grid> */}

                            <Grid size={{ xs: 12, md: 4 }} >
                                <FormColorField name="text_color" label={t("label.textColor")} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }} >
                                <FormColorField name="btn_bg_color" label={t("label.btnColor")} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }} >
                                <FormColorField name="btn_color" label="Btn Text Color" />
                            </Grid>

                            <Grid size={{ xs: 12 }} >
                                <FormSliderField
                                    name="overlay_opacity"
                                    label={t("label.overlayOpacity")}
                                    min={0}
                                    max={100}
                                    step={5}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Divider sx={{ my: 1 }} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 8 }} >
                                <FormTextField
                                    name="link_url"
                                    label={t("label.linkUrl")}
                                    placeholder="https://..." fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }} display="flex" alignItems="center" justifyContent="center">
                                <FormCheckbox
                                    name='is_active'
                                    label={t("label.isActive")}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <DropzoneField
                                    name="image_url"
                                    label={t("label.imageUrl")}
                                    maxSize={5 * 1024 * 1024}
                                />
                            </Grid>
                        </Grid>
                    </FormContainer>
                </Grid>

                <Grid size={{ xs: 12, xl: 5 }}>
                    <Box sx={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 3 }}>

                        <Paper sx={{ p: 2, borderRadius: 3 }}>
                            <BannerPreview data={watchedValues} language="en" />
                        </Paper>

                        <Paper sx={{ p: 2, borderRadius: 3 }}>
                            <BannerPreview data={watchedValues} language="ar" />
                        </Paper>

                    </Box>
                </Grid>

            </Grid>
        </AppFormProvider>
    );
}