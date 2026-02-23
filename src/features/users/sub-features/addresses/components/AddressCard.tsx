// src/features/users/sub-features/addresses/components/AddressCard.tsx

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card, CardContent, Typography, Stack, IconButton, Chip, Divider, Tooltip } from "@mui/material";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

import { usePermission } from "@/features/auth";
import { MapSkeleton } from "@/shared/map";

import type { UserAddress } from "../types";

const MapDisplay = lazy(() => import("@/shared/map/components/MapDisplay"))

interface Props {
    address: UserAddress;
    onEdit: (id: string) => void;
    onDelete: (address: UserAddress) => void;
}

export function AddressCard({ address, onEdit, onDelete }: Props) {
    const { t } = useTranslation(["address", "common"]);

    const { hasPermission } = usePermission()

    return (
        <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
                {/* Header: Name & Actions */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Stack spacing={0.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="subtitle2" fontWeight="bold">
                                {address.full_name}
                            </Typography>
                            {address.is_default && (
                                <Chip
                                    label={t("labels.default")}
                                    size="small"
                                    color="primary"
                                    variant="filled"
                                />
                            )}
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                            <PhoneIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption">{address.phone || "N/A"}</Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        {hasPermission("address.update") && <Tooltip title={t("common:actions.edit")}>
                            <IconButton onClick={() => onEdit(address.id)} size="small" color="warning">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>}
                        {hasPermission("address.delete") && <Tooltip title={t("common:actions.delete")}>
                            <IconButton onClick={() => onDelete(address)} size="small" color="error">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>}
                    </Stack>
                </Stack>

                <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />

                {/* Location Text */}
                <Stack direction="row" spacing={1} sx={{ mb: 2, minHeight: 40 }}>
                    <LocationOnIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.3 }} />
                    <Typography variant="body2" color="text.primary">
                        {address.street_address}, {address.city}, {address.country}
                    </Typography>
                </Stack>

                {/* Map Preview */}
                <Suspense fallback={<MapSkeleton />}>
                    {!!address.lat && !!address.lng && <MapDisplay
                        lat={address.lat}
                        lng={address.lng}
                    />}
                </Suspense>
            </CardContent>
        </Card>
    );
}