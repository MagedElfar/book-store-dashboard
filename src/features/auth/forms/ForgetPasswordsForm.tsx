import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

import { Logo, RouterLink } from '@/shared/components';
import { paths } from '@/shared/constants';
import { FormContainer, FormTextField, AppFormProvider } from '@/shared/form';
import { errorMapper } from '@/shared/utilities';

import { forgotPassword } from '../api';
import { ForgotPasswordSchema, type ForgotPasswordSchemaType } from '../schema'

export function ForgetPasswordsForm() {

    const { t } = useTranslation("auth")

    const defaultValues: ForgotPasswordSchemaType = {
        email: "",
    }


    const methods = useForm<ForgotPasswordSchemaType>({
        resolver: zodResolver(ForgotPasswordSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: ForgotPasswordSchemaType) => {

        const { email } = data
        try {

            await forgotPassword(email)

            toast.success(t("feedback.successForgetPassword"))

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<ForgotPasswordSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                submitText={t("forgetPasswordBtn")}
                stackProps={{ alignItems: "center" }}
                buttonProps={{
                    sx: { width: "100%" }
                }}
            >
                <Logo />

                <Typography variant="h4">{t("forgetPassword")}</Typography>

                <FormTextField
                    name="email"
                    label={t("label.email")}
                    placeholder={t("placeHolder.email")}
                    required
                />

                <Stack width="100%" direction="row" alignItems="center" justifyContent="flex-end">
                    <RouterLink
                        text={t("backToLogin")}
                        to={paths.auth.login}
                        sx={{
                            typography: "caption",
                            fontSize: "0.75rem"
                        }}
                    />
                </Stack>
            </FormContainer>
        </AppFormProvider>
    )
}
