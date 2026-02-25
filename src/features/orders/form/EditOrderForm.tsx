import { zodResolver } from '@hookform/resolvers/zod';
import { Divider, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { AppFormProvider, FormContainer, FormCountrySelect, FormRadioGroup, FormTextField } from '@/shared/form';
import { errorMapper } from '@/shared/utilities';

import { useUpdateOrder } from '../hooks';
import { EditOrderSchema, type EditOrderFormType } from '../schema';
import type { Order } from '../types';

interface Props {
    order: Order
    onSuccess?: () => void
}

export function EditOrderForm({ order, onSuccess }: Props) {
    const { t } = useTranslation("order");

    const { mutateAsync: updateOrder } = useUpdateOrder(order.id);

    const defaultValues: Partial<EditOrderFormType> = {
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        shipping_details: {
            country: order.shipping_details?.country ?? "",
            city: order.shipping_details.city ?? "",
            street_address: order.shipping_details?.street_address ?? ""
        },
        payment_method: order.payment_method,
        orderNotes: order?.note
    };

    const methods = useForm<EditOrderFormType>({
        resolver: zodResolver(EditOrderSchema(t)),
        defaultValues,
    });


    const onsubmit = async (data: EditOrderFormType) => {

        try {
            await updateOrder({
                customer_name: data.customer_name,
                customer_email: data.customer_email,
                customer_phone: data.customer_phone,
                shipping_details: {
                    country: data.shipping_details?.country,
                    city: data.shipping_details.city,
                    street_address: data.shipping_details?.street_address,
                },
                payment_method: data.payment_method,
                note: data?.orderNotes || ""
            });
            toast.success(t("feedback.successSave"));

            onSuccess?.()
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<EditOrderFormType> methods={methods} onSubmit={onsubmit}>
            <FormContainer stackProps={{ alignItems: "center" }}>
                <Stack spacing={2}>

                    <Divider>{t("fields.customerInfo")}</Divider>

                    <Grid spacing={2} container>
                        <Grid size={{ xs: 12 }}>
                            <FormTextField required name="customer_name" label={t("fields.customer_name")} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormTextField required name="customer_phone" label={t("fields.customer_phone")} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormTextField required name="customer_email" label={t("fields.customer_email")} />
                        </Grid>
                    </Grid>

                    <Divider>{t("fields.shippingAddress")}</Divider>

                    <Grid spacing={2} container>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormCountrySelect
                                required
                                label={t("fields.country")}
                                name="shipping_details.country"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormTextField
                                name="shipping_details.city"
                                label={t("fields.city")}
                                placeholder={t("fields.city")}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormTextField
                                name="shipping_details.street_address"
                                label={t("fields.address")}
                                placeholder={t("fields.address")}
                                multiline
                                rows={4}
                                required
                                slotProps={{
                                    inputLabel: { shrink: true }
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Divider>{t("fields.payment_method")}</Divider>

                    <Stack spacing={1}>
                        <FormRadioGroup
                            name="payment_method"
                            options={[
                                { label: t("methods.cod"), value: "cod" },
                                { label: t("methods.credit_card"), value: "credit_card" },
                            ]}
                        />

                        <FormTextField
                            name="orderNotes"
                            label={t("fields.orderNotes")}
                            multiline
                            rows={3}
                        />
                    </Stack>
                </Stack>
            </FormContainer>
        </AppFormProvider>
    );
}