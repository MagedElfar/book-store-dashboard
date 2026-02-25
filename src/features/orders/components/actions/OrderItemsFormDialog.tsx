import { useTranslation } from "react-i18next";

import { FormDialog } from "@/shared/components";

import { UpdateOrderItemsForm } from "../../form";
import type { OrderItem } from "../../types";


interface Props {
    open: boolean;
    onClose: () => void;
    orderId: string;
    items: OrderItem[]
}

export function OrderItemsFormDialog({ open, onClose, orderId, items }: Props) {
    const { t } = useTranslation("order");

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            title={t("orderItems")}
        >
            <UpdateOrderItemsForm
                orderId={orderId}
                onSuccess={onClose}
                items={items}
            />
        </FormDialog>
    );
}