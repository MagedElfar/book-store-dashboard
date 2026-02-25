import { Grid, Typography, Stack, Paper, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";

import { SHIPPING_FEE, VAT_FEE } from "@/core";
import { FormRadioGroup, FormTextField } from "@/shared/form";
import type { SupportedLang } from "@/shared/types";

import type { CreateOrderFormSchemaType } from "../../schema";
import { OrderItemsReview, OrderSummaryCard } from "../ui";


export function PaymentAndReviewStep() {
    const { t, i18n } = useTranslation("order");
    const { watch } = useFormContext<CreateOrderFormSchemaType>();
    const customerName = watch("customer_name");
    const paymentMethod = watch("payment_method");

    const lang = i18n.language as SupportedLang

    const translatedMethod = paymentMethod ? t(`methods.${paymentMethod}` as any) : "---";
    const items = watch("items") || [];


    const shippingCost = SHIPPING_FEE;
    const subtotal = items.reduce((sum, item) => {
        const price = item.price as number
        const quantity = item.quantity as number
        return sum + price * quantity
    }, 0)
    const vatCost = subtotal * VAT_FEE;
    const finalTotal = vatCost + subtotal + Number(shippingCost);

    return (
        <Stack spacing={4}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>
                        {t("fields.payment_method")}
                    </Typography>
                    <FormRadioGroup
                        name="payment_method"
                        options={[
                            { label: t("methods.cod"), value: "cod" },
                            { label: t("methods.credit_card"), value: "credit_card" },
                        ]}
                    />

                    <Box sx={{ mt: 3 }}>
                        <FormTextField
                            name="orderNotes"
                            label={t("fields.orderNotes")}
                            multiline
                            rows={3}
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                        <OrderItemsReview
                            items={items.map(item => ({
                                id: item.bookId,
                                price: item.price as number,
                                quantity: item.quantity as number,
                                name: item.item.data?.[`title_${lang}`]
                            }))}
                        />
                        <OrderSummaryCard
                            subtotal={subtotal}
                            vatCost={vatCost}
                            shippingCost={shippingCost}
                            finalTotal={finalTotal}
                        />
                    </Stack>

                </Grid>
            </Grid>

            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                    bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'rgba(144, 202, 249, 0.08)'
                            : 'rgba(25, 118, 210, 0.04)',
                    borderRadius: 1,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                }}
            >
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    sx={{ mb: 0.5, fontWeight: 700 }}
                >
                    {t("summary.confirmation_title")}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.primary',
                        lineHeight: 1.6
                    }}
                >
                    <Trans
                        t={t}
                        i18nKey="summary.confirmation_text"
                        values={{
                            name: customerName,
                            method: translatedMethod,
                        }}
                        components={[
                            <span key="0" />,
                            <strong
                                key="1"
                                style={{
                                    color: 'inherit',
                                    fontWeight: 800,
                                    textDecoration: 'underline',
                                    textDecorationColor: 'rgba(25, 118, 210, 0.3)'
                                }}
                            />
                        ]}
                    />
                </Typography>
            </Paper>
        </Stack>
    );
}