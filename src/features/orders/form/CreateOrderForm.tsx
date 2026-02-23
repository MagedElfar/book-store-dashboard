import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { AppFormProvider, MultiStepFormContainer } from '@/shared/form';
import { errorMapper } from '@/shared/utilities';

import { CustomerInfoStep } from '../components';
import { CreateOrderFormSchema, type CreateOrderFormSchemaType } from '../schema';

export function CreateOrderForm() {
    const { t } = useTranslation("order");
    const navigate = useNavigate();
    // const { mutateAsync: createOrder } = useCreateOrder();

    const defaultValues: Partial<CreateOrderFormSchemaType> = {
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        payment_method: "cod",
        items: [],
        shipping_details: {
            country: "",
            city: "",
            state: "",
            street_address: "",
        }
    };

    const methods = useForm<CreateOrderFormSchemaType>({
        resolver: zodResolver(CreateOrderFormSchema(t)),
        defaultValues
    });

    const onsubmit = async (data: CreateOrderFormSchemaType) => {
        try {
            // await createOrder(data);
            console.log("Submitting Order:", data);
            toast.success(t("feedback.successSave"));
            // navigate(paths.dashboard.orders.root);
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    const steps = [
        {
            label: t("steps.customerInfo"),
            fields: ['customer_name', 'customer_email', 'customer_phone'],
            component: <CustomerInfoStep />
        }
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