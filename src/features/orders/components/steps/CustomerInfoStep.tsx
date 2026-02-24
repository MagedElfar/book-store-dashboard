import { Grid, Typography, Divider, Stack } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUserAutoComplete, type User } from "@/features/users";
import { FormAutocomplete, FormCountrySelect, FormTextField } from "@/shared/form";

import type { CreateOrderFormSchemaType } from "../../schema";
import ShippingAddress from "../ui/ShippingAddress";


export function CustomerInfoStep() {
    const { t } = useTranslation("order");
    const { watch, setValue } = useFormContext<CreateOrderFormSchemaType>();

    const { options, setSearch, setIsUserEnabled, ...userQuery } = useUserAutoComplete();

    const user = watch("user")?.data as User

    const handleUserSelect = useCallback(() => {
        setValue("user_id", user?.id || null);
        setValue("customer_name", user?.full_name || "");
        setValue("customer_email", user?.email || "");
        setValue("customer_phone", user?.phone || "");
        setValue("shipping_details.country", "");
        setValue("shipping_details.city", "");
        setValue("shipping_details.street_address", "");
    }, [setValue, user])


    useEffect(() => {
        handleUserSelect()
    }, [handleUserSelect])

    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                    {t("fields.searchCustomer")}
                </Typography>
                <FormAutocomplete<User>
                    name="user"
                    label={t("fields.user")}
                    options={options}
                    loading={userQuery.isLoading}
                    onSearchChange={setSearch}
                    hasNextPage={userQuery.hasNextPage}
                    fetchNextPage={userQuery.fetchNextPage}
                    isFetchingNextPage={userQuery.isFetchingNextPage}
                    defaultValue={watch("user")}
                    onOpen={() => setIsUserEnabled(true)}
                />
            </Stack>

            <Divider>{t("fields.customerInfo")}</Divider>

            <Grid spacing={2} container>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FormTextField required name="customer_name" label={t("fields.customer_name")} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FormTextField required name="customer_phone" label={t("fields.customer_phone")} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FormTextField required name="customer_email" label={t("fields.customer_email")} />
                </Grid>
            </Grid>

            <Divider>{t("fields.shippingAddress")}</Divider>

            {
                user ?
                    <ShippingAddress />
                    :
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
            }
        </Stack>
    );
}

