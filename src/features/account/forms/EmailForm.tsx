import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

import { useAuthState } from '@/features/auth';
import { FormContainer, FormTextField, AppFormProvider } from '@/shared/form';
import { errorMapper } from '@/shared/utilities';

import { changeEmailApi } from '../api';
import { EmailSchema, type EmailSchemaType } from '../schema'


export function EmailForm() {

    const { user } = useAuthState()
    const { t } = useTranslation("account")

    const defaultValues: EmailSchemaType = {
        email: user!.email,
    }


    const methods = useForm<EmailSchemaType>({
        resolver: zodResolver(EmailSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: EmailSchemaType) => {
        try {

            await changeEmailApi(data.email)

            toast.success(t("feedBack.successEmailUpdate"))
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<EmailSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer stackProps={{
                alignItems: "center"
            }}>

                <FormTextField
                    name="email"
                    label={t("label.email")}
                    placeholder={t("placeHolder.email")}
                    required
                />
            </FormContainer>
        </AppFormProvider>
    )
}
