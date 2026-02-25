import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { mapBookToOption, type Book } from '@/features/books';
import { AppFormProvider, FormContainer } from '@/shared/form';
import type { SupportedLang } from '@/shared/types';
import { errorMapper } from '@/shared/utilities';

import { OrderItemsStep } from '../components';
import { useUpdateOrderItems } from '../hooks';
import { OrderListFormSchema, type OrderListFormType } from '../schema';
import type { OrderItem } from '../types';


interface Props {
    orderId: string
    items: OrderItem[]
    onSuccess?: () => void
}

export function UpdateOrderItemsForm({ orderId, items, onSuccess }: Props) {
    const { t, i18n } = useTranslation("order");
    const lang = i18n.language as SupportedLang

    const { mutateAsync: updateOrderItems } = useUpdateOrderItems(orderId);

    const defaultValues: Partial<OrderListFormType> = {
        items: items.map(item => ({
            item: mapBookToOption(item.book as Book, lang),
            price: item.price_at_purchase,
            quantity: item.quantity,
            bookId: item.book_id
        }))
    };

    const methods = useForm<OrderListFormType>({
        resolver: zodResolver(OrderListFormSchema(t)),
        defaultValues,
    });


    const onsubmit = async (data: OrderListFormType) => {
        try {
            await updateOrderItems(data.items.map(item => ({
                bookId: item.bookId,
                quantity: Number(item.quantity),
                price: Number(item.price)
            })));
            toast.success(t("feedback.successSave"));

            onSuccess?.()
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<OrderListFormType> methods={methods} onSubmit={onsubmit}>
            <FormContainer stackProps={{ alignItems: "center" }}>

                <OrderItemsStep />

            </FormContainer>
        </AppFormProvider>
    );
}