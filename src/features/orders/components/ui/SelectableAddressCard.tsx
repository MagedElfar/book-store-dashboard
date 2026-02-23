import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card, CardContent, Typography, Stack, Divider, CardActionArea } from "@mui/material";
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useUpdateAddress, type UserAddress } from '@/features/users';
import { errorMapper } from '@/shared/utilities';

import type { CreateOrderFormSchemaType } from '../../schema';


interface Props {
    address: UserAddress;
    isSelected: boolean;
}

export function SelectableAddressCard({ address, isSelected }: Props) {

    const { t } = useTranslation(["address", "common"])
    const { watch } = useFormContext<CreateOrderFormSchemaType>()

    const { mutateAsync } = useUpdateAddress(watch("user_id")!)

    const handelSelect = async () => {
        const toastId = toast.loading(t("common:processing"))
        try {
            await mutateAsync({
                id: address.id,
                data: {
                    ...address,
                    is_default: true
                }
            })
            toast.dismiss(toastId)
            toast.success(t("feedback.successUpdateAddress", { toastId }))
        } catch (error) {
            toast.dismiss(toastId)
            errorMapper(error).forEach(err => toast.error(err, { toastId }))
        } finally {
            toast.dismiss(toastId)
        }
    }

    return (
        <Card
            component={motion.div}
            layout
            variant="outlined"
            sx={{
                height: '100%',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                borderColor: isSelected ? 'primary.main' : 'divider',
                borderWidth: isSelected ? 2 : 1,
                transition: 'border-color 0.3s ease',
                boxShadow: isSelected ? 3 : 0
            }}
        >
            {isSelected && (
                <motion.div
                    layoutId="highlight"
                    className="absolute-fill"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'var(--mui-palette-primary-lighter)', // أو استخدم theme.palette
                        zIndex: 0
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}
            <CardActionArea
                onClick={handelSelect}
                sx={{ height: '100%' }}
            >
                <CardContent>
                    {/* Selected Badge */}
                    {isSelected && (
                        <CheckCircleIcon
                            color="primary"
                            sx={{ position: 'absolute', top: 12, right: 12 }}
                        />
                    )}

                    <Stack spacing={0.5} sx={{ pr: 4 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            {address.full_name}
                        </Typography>

                        {address.phone && <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                            <PhoneIcon sx={{ fontSize: 14 }} />
                            <Typography variant="caption">{address.phone}</Typography>
                        </Stack>}
                    </Stack>

                    <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />

                    <Stack direction="row" spacing={1}>
                        <LocationOnIcon sx={{
                            color: isSelected ? 'primary.main' : 'text.disabled',
                            fontSize: 18
                        }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {address.street_address}, {address.city}, {address.country}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}