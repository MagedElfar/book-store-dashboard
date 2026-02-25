import { useTranslation } from "react-i18next";

import { FormDialog } from "@/shared/components";

import { EditOrderForm } from "../../form";
import type { Order } from "../../types";


interface Props {
    open: boolean;
    onClose: () => void;
    order: Order;
}

export function EditOrderFormDialog({ open, onClose, order }: Props) {
    const { t } = useTranslation("order");

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            title={t("editOrder")}
        >

            <EditOrderForm
                order={order}
                onSuccess={onClose}
            />
        </FormDialog>
    );
}