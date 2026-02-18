import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { Logo, RouterLink } from '@/shared/components';
import { paths } from '@/shared/constants';
import { FormContainer, FormPasswordField, AppFormProvider } from '@/shared/form';
import { errorMapper } from '@/shared/utilities';

import { resetPassword } from '../api';
import { ResetPasswordSchema, type ResetPasswordSchemaType } from '../schema'

export function ResetPasswordForm() {

    const { t } = useTranslation("auth")

    const navigate = useNavigate()

    const defaultValues: ResetPasswordSchemaType = {
        password: "",
        confirmPassword: ""
    }


    const methods = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(ResetPasswordSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: ResetPasswordSchemaType) => {

        const { password } = data
        try {

            await resetPassword(password)
            toast.success(t("feedback.successRestPassword"))
            navigate(paths.auth.login)

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<ResetPasswordSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                stackProps={{ alignItems: "center" }}
                buttonProps={{
                    sx: { width: "100%" }
                }}
            >
                <Logo />

                <Typography variant="h4">{t("restPassword")}</Typography>

                <FormPasswordField
                    name="password"
                    label={t("label.password")}
                    placeholder={t("placeHolder.password")}
                    required
                />

                <FormPasswordField
                    name="confirmPassword"
                    label={t("label.confirmPassword")}
                    placeholder={t("placeHolder.confirmPassword")}
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
