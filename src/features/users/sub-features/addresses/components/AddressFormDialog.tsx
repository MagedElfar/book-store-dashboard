import { useTranslation } from "react-i18next";

import { FormDialog } from "@/shared/components";

import { AddressForm } from "../forms";
import type { UserAddress } from "../types";

interface Props {
    open: boolean;
    onClose: () => void;
    address?: UserAddress | null;
    userId: string
}

export function AddressFormDialog({ open, onClose, address, userId }: Props) {
    const { t } = useTranslation("address");

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            title={address ? t("titles.EditAdders") : t("titles.createAddress")}
        >

            <AddressForm
                address={address}
                onSuccess={onClose}
                usId={userId}
            />
        </FormDialog>
    );
}