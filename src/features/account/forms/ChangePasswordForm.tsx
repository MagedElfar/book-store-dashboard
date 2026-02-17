import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

import { useAuthState } from '@/features/auth';
import { FormContainer, AppFormProvider, FormPasswordField } from '@/shared/form';
import { errorMapper } from '@/shared/utilities';

import { changePasswordApi } from '../api';
import { ChangePasswordSchema, type ChangePasswordSchemaType } from '../schema'


export function ChangePasswordForm() {

    const { user } = useAuthState()
    const { t } = useTranslation("account")

    const defaultValues: ChangePasswordSchemaType = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    }


    const methods = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(ChangePasswordSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: ChangePasswordSchemaType) => {
        const { oldPassword, newPassword } = data
        try {

            await changePasswordApi(oldPassword, newPassword, user!.email)

            toast.success(t("feedBack.successPasswordUpdate"))

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<ChangePasswordSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer stackProps={{
                alignItems: "center"
            }}>

                <FormPasswordField
                    name="oldPassword"
                    label={t("label.oldPassword")}
                    placeholder={t("placeHolder.oldPassword")}
                    required
                />

                <FormPasswordField
                    name="newPassword"
                    label={t("label.newPassword")}
                    placeholder={t("placeHolder.newPassword")}
                    required
                />

                <FormPasswordField
                    name="confirmPassword"
                    label={t("label.confirmPassword")}
                    placeholder={t("placeHolder.confirmPassword")}
                    required
                />
            </FormContainer>
        </AppFormProvider>
    )
}
