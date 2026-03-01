import { FormDialog } from "@/shared/components";
import { useLocalize } from "@/shared/lib";

import { UpdateOrderItemsForm } from "../../form";
import type { OrderItem } from "../../types";


interface Props {
    open: boolean;
    onClose: () => void;
    orderId: string;
    items: OrderItem[]
}

export function OrderItemsFormDialog({ open, onClose, orderId, items }: Props) {
    const { t } = useLocalize("order");

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