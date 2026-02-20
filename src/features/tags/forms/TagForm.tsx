import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Switch, FormControlLabel } from '@mui/material';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FormTextField, AppFormProvider, FormContainer } from '@/shared/form';
import { errorMapper } from '@/shared/utilities';

import { useCreateTag, useUpdateTag } from '../hooks';
import { TagFormSchema, type TagFormSchemaType } from '../schema';
import type { Tag, CreateTagPayload, UpdateTagPayload } from '../types';

interface Props {
    tag?: Tag | null;
    onSuccess?: () => void;
}

export function TagForm({ tag, onSuccess }: Props) {
    const { t } = useTranslation("tag");
    const { mutateAsync: createTag } = useCreateTag();
    const { mutateAsync: updateTag } = useUpdateTag();

    const defaultValues: TagFormSchemaType = {
        name_ar: tag?.name_ar || "",
        name_en: tag?.name_en || "",
        slug: tag?.slug || "",
        is_active: tag?.is_active ?? true,
    };

    const methods = useForm<TagFormSchemaType>({
        resolver: zodResolver(TagFormSchema(t)),
        defaultValues,
    });

    const { setValue, control } = methods;
    const nameEnValue = useWatch({ control, name: 'name_en' });

    useEffect(() => {
        if (!tag && nameEnValue) {
            const generatedSlug = nameEnValue
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setValue('slug', generatedSlug, { shouldValidate: true });
        }
    }, [nameEnValue, setValue, tag]);

    const onsubmit = async (data: TagFormSchemaType) => {
        try {
            if (tag) {
                await updateTag({ id: tag.id, data: data as UpdateTagPayload });
                toast.success(t("feedback.successUpdateTag"));
            } else {
                await createTag(data as CreateTagPayload);
                toast.success(t("feedback.successCreateTag"));
            }

            onSuccess?.();
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<TagFormSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer stackProps={{ alignItems: "center" }}>
                <Grid container spacing={3}>
                    {/* English Name */}
                    <Grid size={{ xs: 12 }}>
                        <FormTextField
                            name="name_en"
                            label={t("label.nameEn")}
                            placeholder={t("placeHolder.nameEn")}
                            required
                        />
                    </Grid>

                    {/* Arabic Name */}
                    <Grid size={{ xs: 12 }}>
                        <FormTextField
                            name="name_ar"
                            label={t("label.nameAr")}
                            placeholder={t("placeHolder.nameAr")}
                            required
                        />
                    </Grid>

                    {/* Slug */}
                    <Grid size={{ xs: 12 }}>
                        <FormTextField
                            name="slug"
                            label={t("label.slug")}
                            placeholder={t("placeHolder.slug")}
                            required
                            disabled={!!tag} // ممنوع تعديل السلوج لو بنعمل Update
                            helperText={t("helper.slugInfo")}
                        />
                    </Grid>

                    {/* Status Switch */}
                    <Grid size={{ xs: 12 }}>
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
                </Grid>
            </FormContainer>


        </AppFormProvider>
    );
}