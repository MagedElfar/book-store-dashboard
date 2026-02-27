import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { paths } from '@/shared/constants';
import { AppFormProvider, MultiStepFormContainer } from '@/shared/form';
import { errorMapper } from '@/shared/utilities';

import { CustomerInfoStep, OrderItemsStep, PaymentAndReviewStep } from '../components';
import { useCreateOrder } from '../hooks';
import { CreateOrderFormSchema, type CreateOrderFormSchemaType } from '../schema';
import { mapCreateOrderFormToRequest } from '../utilities';

export function CreateOrderForm() {
    const { t } = useTranslation("order");
    const navigate = useNavigate();
    const { mutateAsync: createOrder } = useCreateOrder();

    const defaultValues: Partial<CreateOrderFormSchemaType> = {
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        payment_method: "cod",
        user: null,
        items: [],
        shipping_details: {
            country: "",
            city: "",
            street_address: "",
        }
    };

    const methods = useForm<CreateOrderFormSchemaType>({
        resolver: zodResolver(CreateOrderFormSchema(t)),
        defaultValues
    });

    const onsubmit = async (data: CreateOrderFormSchemaType) => {
        try {
            const payload = mapCreateOrderFormToRequest(data)
            await createOrder(payload);
            toast.success(t("feedback.successSave"));
            navigate(paths.dashboard.orders.root);
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    const steps = [
        {
            label: t("steps.customerInfo"),
            fields: [
                'customer_name', 'customer_email', 'customer_phone', "customer_phone", "shipping_details.country", "shipping_details.city", "shipping_details.street_address"
            ],
            component: <CustomerInfoStep />
        },
        {
            label: t("steps.orderItems"),
            fields: ["items"],
            component: <OrderItemsStep />
        },
        {
            label: t("steps.paymentAndReview"),
            fields: [],
            component: <PaymentAndReviewStep />
        },
    ];

    return (
        <AppFormProvider<CreateOrderFormSchemaType> methods={methods} onSubmit={onsubmit}>
            <MultiStepFormContainer
                steps={steps}
                submitText={t("actions.createOrder")}
            />
        </AppFormProvider>
    );
}