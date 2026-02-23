import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import { lazy, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { paths } from '@/shared/constants';
import { FormContainer, FormTextField, AppFormProvider, FormPhoneInput, FormCheckbox } from '@/shared/form';
import { MapSkeleton } from '@/shared/map';
import { errorMapper } from '@/shared/utilities';

import { useCreateAddress, useUpdateAddress } from '../hooks';
import { AddressFormSchema, type AddressFormSchemaType } from '../schema';
import type { CreateAddressPayload, UserAddress } from '../types';

const MapPickerField = lazy(() => import('@/shared/map/components/MapPickerField'));

interface Props {
    usId?: string,
    address?: UserAddress | null;
    onSuccess?: () => void
}

export function AddressForm({ address, onSuccess, usId }: Props) {
    const { t } = useTranslation("address");
    const { id: userId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { mutateAsync: createAddress } = useCreateAddress(usId ?? userId!);
    const { mutateAsync: updateAddress } = useUpdateAddress(usId ?? userId!);

    const defaultValues: AddressFormSchemaType = {
        full_name: address?.full_name || "",
        phone: address?.phone || "",
        country: address?.country || "",
        city: address?.city || "",
        street_address: address?.street_address || "",
        is_default: address?.is_default || true,
        lat: address?.lat ?? 0,
        lng: address?.lng ?? 0,
        user_id: usId ?? userId,
    };

    const methods = useForm<AddressFormSchemaType>({
        resolver: zodResolver(AddressFormSchema(t)),
        defaultValues,
    });

    const onSubmit = async (data: AddressFormSchemaType) => {
        try {

            if (address) {
                await updateAddress({ id: address.id, data });
                toast.success(t("feedback.successUpdateAddress"));
            } else {

                await createAddress(data as CreateAddressPayload);
                toast.success(t("feedback.successCreateAddress"));
            }

            if (onSuccess) {
                onSuccess?.()
                return
            }
            navigate(paths.dashboard.addresses.root(userId!));


        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<AddressFormSchemaType> methods={methods} onSubmit={onSubmit}>
            <FormContainer
                stackProps={{ alignItems: "center" }}
                submitText={address ? t("actions.saveAddress") : t("actions.addAddress")}
            >
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="full_name"
                            label={t("labels.fullName")}
                            placeholder={t("placeHolder.fullName")}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormPhoneInput
                            name="phone"
                            label={t("labels.phone")}
                            placeholder={t("placeHolder.phone")}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="country"
                            label={t("labels.country")}
                            placeholder={t("placeHolder.country")}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="city"
                            label={t("labels.city")}
                            placeholder={t("placeHolder.city")}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormTextField
                            name="street_address"
                            label={t("labels.streetAddress")}
                            placeholder={t("placeHolder.streetAddress")}
                            multiline
                            rows={2}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormCheckbox
                            name="is_default"
                            label={t("labels.isDefault")}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        {/* Use Suspense with your new MapSkeleton */}
                        <Suspense fallback={<MapSkeleton />}>
                            <MapPickerField
                                nameLat="lat"
                                nameLng="lng"
                                label={t("labels.location")}
                            />
                        </Suspense>
                    </Grid>
                </Grid>
            </FormContainer>
        </AppFormProvider>
    );
}