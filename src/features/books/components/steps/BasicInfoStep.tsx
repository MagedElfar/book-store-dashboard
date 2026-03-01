import { Grid } from '@mui/material';

import { FormCheckbox, FormRichTextField, FormTextField } from '@/shared/form';
import { useLocalize } from '@/shared/lib';

export function BasicInfoStep() {
    const { t } = useLocalize("book");
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField name="title_en" label={t("label.titleEn")} required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField name="title_ar" label={t("label.titleAr")} required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField name="slug" label={t("label.slug")} required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField name="sku" label={t("label.sku")} required />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FormRichTextField
                    name="description_en"
                    label={t("label.descEn")}
                    placeholder={t("placeHolder.descEn")}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FormRichTextField
                    name="description_ar"
                    label={t("label.descAr")}
                    placeholder={t("placeHolder.descAr")}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FormCheckbox
                    name="is_active"
                    label={t("label.isActive")}
                />
            </Grid>
        </Grid>
    );
}