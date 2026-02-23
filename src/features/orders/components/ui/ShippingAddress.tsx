import AddIcon from '@mui/icons-material/Add'; // لا تنسى استيراد الأيقونة
import { Grid, Stack, Card, CardActionArea, Typography } from '@mui/material';
import { motion, LayoutGroup } from 'framer-motion';
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AddressFormDialog, LoadingAddressList, useGetAddresses, type UserAddress } from '@/features/users';
import { DataHandler } from '@/shared/components';
import { useDialog } from '@/shared/hooks';

import type { CreateOrderFormSchemaType } from '../../schema';

import { SelectableAddressCard } from './SelectableAddressCard';


export default function ShippingAddress() {
    const quietTransition = {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 1
    } as const;

    const { t } = useTranslation("address")

    const { setValue, watch } = useFormContext<CreateOrderFormSchemaType>();
    const userId = watch("user_id") || "";
    const selectedAddress = watch("shipping_details");

    const { data: addresses, isLoading, isError, refetch } = useGetAddresses(userId);
    const { isCreate, openCreate, closeDialog } = useDialog<UserAddress>();

    const handleSetAddress = useCallback((addr: UserAddress) => {
        setValue("shipping_details.id", addr?.id || "");
        setValue("shipping_details.country", addr?.country || "", { shouldValidate: true });
        setValue("shipping_details.city", addr?.city || "", { shouldValidate: true });
        setValue("shipping_details.street_address", addr?.street_address || "", { shouldValidate: true });
    }, [setValue]);

    useEffect(() => {
        if (addresses && addresses.length > 0) {
            const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
            handleSetAddress(defaultAddr);
        }
    }, [addresses, handleSetAddress]);

    return (
        <DataHandler
            isLoading={isLoading}
            isError={isError}
            data={addresses}
            onRetry={refetch}
            loadingComponent={<LoadingAddressList />}
        >
            {(addresses) => (
                <Stack spacing={3}>
                    <LayoutGroup>
                        <Grid container spacing={3}>
                            {addresses.map((address) => (
                                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={address.id}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={quietTransition}
                                        style={{ height: "100%" }}
                                    >
                                        <SelectableAddressCard
                                            address={address}
                                            isSelected={selectedAddress.id === address.id}
                                        />
                                    </motion.div>
                                </Grid>
                            ))}

                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <motion.div
                                    layout
                                    transition={quietTransition}
                                    style={{ height: "100%" }}
                                >
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: '100%',
                                            borderRadius: 2,
                                            borderStyle: 'dashed',
                                            borderColor: 'primary.main',
                                            bgcolor: 'action.hover',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: 120
                                        }}
                                    >
                                        <CardActionArea
                                            type="button"
                                            onClick={openCreate}
                                            sx={{ height: '100%', py: 3 }}
                                        >
                                            <Stack alignItems="center" spacing={1}>
                                                <AddIcon color="primary" fontSize="large" />
                                                <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                                                    {t("actions.addAddress")}
                                                </Typography>
                                            </Stack>
                                        </CardActionArea>
                                    </Card>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </LayoutGroup>

                    <AddressFormDialog
                        open={isCreate}
                        onClose={closeDialog}
                        userId={userId}
                    />
                </Stack>
            )}
        </DataHandler>
    );
}