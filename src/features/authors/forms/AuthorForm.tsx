// src/features/authors/components/AuthorForm.tsx

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Switch, FormControlLabel } from '@mui/material';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { paths } from '@/shared/constants';
import { FormContainer, FormTextField, AppFormProvider, FormDatePicker } from '@/shared/form';
import { DropzoneField } from '@/shared/media';
import { errorMapper, slugify } from '@/shared/utilities';

import { useCreateAuthor, useUpdateAuthor } from '../hooks';
import { AuthorFormSchema, type AuthorFormSchemaType } from '../schema';
import type { Author, CreateAuthorPayload, UpdateAuthorPayload } from '../types';

interface Props {
    author?: Author;
}

export function AuthorForm({ author }: Props) {
    const { t } = useTranslation("author");
    const { mutateAsync: createAuthor } = useCreateAuthor();
    const { mutateAsync: updateAuthor } = useUpdateAuthor();
    const navigate = useNavigate();

    const defaultValues: AuthorFormSchemaType = {
        name_ar: author?.name_ar || "",
        name_en: author?.name_en || "",
        slug: author?.slug || "",
        bio_ar: author?.bio_ar || "",
        bio_en: author?.bio_en || "",
        birth_date: author?.birth_date || null,
        image_url: author?.image_url || null,
        is_active: author?.is_active ?? true,
    };

    const methods = useForm<AuthorFormSchemaType>({
        resolver: zodResolver(AuthorFormSchema(t)),
        defaultValues,
    });

    const { setValue, control } = methods;
    const nameEnValue = useWatch({ control, name: 'name_en' });

    useEffect(() => {
        if (!author && nameEnValue) {
            setValue('slug', slugify(nameEnValue), { shouldValidate: true });
        }
    }, [nameEnValue, setValue, author]);

    const onsubmit = async (data: AuthorFormSchemaType) => {
        try {
            if (author) {
                await updateAuthor({ id: author.id, data: data as UpdateAuthorPayload });
                toast.success(t("feedback.successUpdateAuthor"));
                navigate(paths.dashboard.authors.details(author.id));
                return;
            }

            await createAuthor(data as CreateAuthorPayload);
            toast.success(t("feedback.successCreateAuthor"));
            navigate(paths.dashboard.authors.root);
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<AuthorFormSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                stackProps={{ alignItems: "center" }}
                submitText={author ? t("actions.editAuthor") : t("actions.createAuthor")}
            >
                <Grid container spacing={3}>
                    {/* English Name */}
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

                    {/* Birth Date - المكون الجديد */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormDatePicker
                            name="birth_date"
                            label={t("label.birthDate")}
                            disableFuture
                        />
                    </Grid>

                    {/* Biography English */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="bio_en"
                            label={t("label.bioEn")}
                            placeholder={t("placeHolder.bioEn")}
                            multiline
                            rows={4}
                        />
                    </Grid>

                    {/* Biography Arabic */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="bio_ar"
                            label={t("label.bioAr")}
                            placeholder={t("placeHolder.bioAr")}
                            multiline
                            rows={4}
                        />
                    </Grid>

                    {/* Status & Image */}
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

                    <Grid size={{ xs: 12 }}>
                        <DropzoneField
                            name="image_url"
                            label={t("label.image")}
                            maxSize={2 * 1024 * 1024} // 2 MB كافية لصور المؤلفين
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