import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FormDatePicker, FormTextField } from '@/shared/form';

export function PricingSpecStep() {
    const { t } = useTranslation("book");
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField name="price" label={t("label.price")} type="number" required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField name="sale_price" label={t("label.salePrice")} type="number" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField name="stock" label={t("label.stock")} type="number" required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField name="pages" label={t("label.pages")} type="number" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <FormTextField name="publisher" label={t("label.publisher")} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <FormDatePicker
                    name="published_year"
                    label={t("label.publishedYear")}
                    views={['year']}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <FormTextField name="isbn" label={t("label.isbn")} />
            </Grid>
        </Grid>
    );
}