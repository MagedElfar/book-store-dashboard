// src/features/categories/components/CategoryForm.tsx

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Switch, FormControlLabel } from '@mui/material';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { paths } from '@/shared/constants';
import { FormContainer, FormTextField, AppFormProvider } from '@/shared/form';
import { DropzoneField } from '@/shared/media';
import { errorMapper, slugify } from '@/shared/utilities';

import { useCreateCategory, useUpdateCategory } from '../hooks';
import { CategoryFormSchema, type CategoryFormSchemaType } from '../schema';
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../types';

interface Props {
    category?: Category;
}

export function CategoryForm({ category }: Props) {
    const { t } = useTranslation("category");
    const { mutateAsync: createCategory } = useCreateCategory();
    const { mutateAsync: updateCategory } = useUpdateCategory();
    const navigate = useNavigate();

    const defaultValues: CategoryFormSchemaType = {
        name_ar: category?.name_ar || "",
        name_en: category?.name_en || "",
        slug: category?.slug || "",
        description_ar: category?.description_ar || "",
        description_en: category?.description_en || "",
        image_url: category?.image_url || null,
        is_active: category?.is_active ?? true,
    };

    const methods = useForm<CategoryFormSchemaType>({
        resolver: zodResolver(CategoryFormSchema(t)),
        defaultValues,
    });

    const { setValue, control } = methods;
    const nameEnValue = useWatch({ control, name: 'name_en' });

    // Auto-generate slug from English name (Only when creating or if slug is empty)
    useEffect(() => {
        if (!category && nameEnValue) {
            setValue('slug', slugify(nameEnValue), { shouldValidate: true });
        }
    }, [nameEnValue, setValue, category]);

    const onsubmit = async (data: CategoryFormSchemaType) => {
        try {
            if (category) {
                await updateCategory({ id: category.id, data: data as UpdateCategoryPayload });
                toast.success(t("feedback.successUpdateCategory"));
                navigate(paths.dashboard.categories.details(category.id));
                return;
            }

            await createCategory(data as CreateCategoryPayload);
            toast.success(t("feedback.successCreateCategory"));
            navigate(paths.dashboard.categories.root);
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<CategoryFormSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                stackProps={{ alignItems: "center" }}
                submitText={category ? t("actions.editCategory") : t("actions.createCategory")}
            >
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="name_en"
                            label={t("label.nameEn")}
                            placeholder={t("placeHolder.nameEn")}
                            required
                        />
                    </Grid>

                    {/* Arabic Name */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="name_ar"
                            label={t("label.nameAr")}
                            placeholder={t("placeHolder.nameAr")}
                            required
                        />
                    </Grid>

                    {/* Slug */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="slug"
                            label={t("label.slug")}
                            placeholder={t("placeHolder.slug")}
                            required
                            disabled
                            helperText={t("helper.slugInfo")}
                        />
                    </Grid>

                    {/* Status Switch */}
                    <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="center">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={useWatch({ control, name: 'is_active' })}
                                    onChange={(e) => setValue('is_active', e.target.checked)}
                                />
                            }
                            label={t("label.isActive")}
                        />
                    </Grid>

                    {/* Description English */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="description_en"
                            label={t("label.descriptionEn")}
                            placeholder={t("placeHolder.descriptionEn")}
                            multiline
                            rows={3}
                        />
                    </Grid>

                    {/* Description Arabic */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="description_ar"
                            label={t("label.descriptionAr")}
                            placeholder={t("placeHolder.descriptionAr")}
                            multiline
                            rows={3}
                        />
                    </Grid>

                    {/* Category Image */}
                    <Grid size={{ xs: 12 }}>
                        <DropzoneField
                            name="image_url"
                            label={t("label.image")}
                            maxSize={3 * 1024 * 1024} // 3 MB
                            accept={{
                                "image/jpeg": [".jpeg", ".jpg"],
                                "image/png": [".png"],
                                "image/webp": [".webp"]
                            }}
                        />
                    </Grid>
                </Grid>
            </FormContainer>
        </AppFormProvider>
    );
}