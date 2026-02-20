// src/features/users/sub-features/addresses/pages/UserAddressesPage.tsx

import AddIcon from '@mui/icons-material/Add';
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { usePermission } from "@/features/auth";
import { PageWrapper, PageTitle, DataHandler } from "@/shared/components";
import { paths } from "@/shared/constants";

import { AddressCard, DeleteAddressDialog, LoadingAddressList } from "../components";
import { useGetAddresses } from "../hooks";
import type { UserAddress } from "../types";

export default function UserAddressesPage() {
    const { t } = useTranslation(["address", "common"]);
    const { id: userId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { hasPermission } = usePermission()

    // --- State ---
    const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);

    // --- Data Fetching ---
    const { data: addresses, isLoading, isError, refetch } = useGetAddresses(userId!);

    // --- Handlers ---
    const handleAddAddress = () => {
        navigate(paths.dashboard.addresses.create(userId!));
    };

    return (
        <PageWrapper>
            <PageTitle
                nested
                actions={
                    <>
                        {hasPermission("user.update") && (
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddAddress}
                            >
                                {t("address:actions.addAddress")}
                            </Button>
                        )}
                    </>

                }
            />


            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={addresses}
                onRetry={refetch}
                isEmpty={addresses?.length === 0}
                loadingComponent={<LoadingAddressList />}
            >
                {(addresses) => (
                    <>
                        <Grid container spacing={3}>
                            {addresses.map((address) => (
                                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={address.id}>
                                    <AddressCard
                                        address={address}
                                        onEdit={(id: string) =>
                                            navigate(paths.dashboard.addresses.edit(id, userId!))
                                        }
                                        onDelete={() => setSelectedAddress(address)}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <DeleteAddressDialog
                            open={Boolean(selectedAddress)}
                            addressId={selectedAddress?.id || ""}
                            userId={userId!}
                            onClose={() => setSelectedAddress(null)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}