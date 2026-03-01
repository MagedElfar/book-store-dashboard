import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { useLocalize } from "@/shared/lib";

import { DeleteAddressDialog, AddressFormSkeleton } from "../components";
import { AddressForm } from "../forms";
import { useGetAddressById } from "../hooks";

export default function EditAddressPage() {
    const { t } = useLocalize(["address", "common"]);
    const { id: userId, addressId } = useParams<{ id: string; addressId: string }>();
    const navigate = useNavigate();

    const { data: address, isLoading, isError, refetch } = useGetAddressById(userId, addressId!);

    const [openDelete, setOpenDelete] = useState(false);

    return (
        <PageWrapper>
            <PageTitle
                nested
                withBackArrow
                title={t("actions.editAddress")}
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={address}
                onRetry={refetch}
                loadingComponent={<AddressFormSkeleton />}
            >
                {(addressData) => (
                    <>
                        <AddressForm address={addressData} />

                        <DeleteAddressDialog
                            open={openDelete}
                            addressId={addressData.id}
                            userId={userId!}
                            onClose={() => setOpenDelete(false)}
                            onSuccess={() => navigate(-1)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}