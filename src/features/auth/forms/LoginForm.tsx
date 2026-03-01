import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { Logo, RouterLink } from '@/shared/components';
import { paths } from '@/shared/constants';
import { FormCheckbox, FormContainer, FormPasswordField, FormTextField, AppFormProvider } from '@/shared/form';
import { useLocalize } from '@/shared/lib';
import { errorMapper } from '@/shared/utilities';

import { useAuthActions } from '../hooks/useAuthActions';
import { LoginSchema, type LoginSchemaType } from '../schema'

export function LoginForm() {

    const { login } = useAuthActions()
    const { t } = useLocalize("auth")

    const navigate = useNavigate()

    const defaultValues: LoginSchemaType = {
        email: "",
        password: "",
        rememberMe: false
    }


    const methods = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: LoginSchemaType) => {

        const { email, password } = data
        try {

            await login(email, password)
            navigate("/", { replace: true })

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<LoginSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                submitText={t("signinBtn")}
                stackProps={{ alignItems: "center" }}
                buttonProps={{
                    sx: { width: "100%" }
                }}
            >
                <Logo />

                <Typography variant="h4">{t("signin")}</Typography>

                <FormTextField
                    name="email"
                    label={t("label.email")}
                    placeholder={t("placeHolder.email")}
                    required
                />

                <FormPasswordField
                    name="password"
                    label={t("label.password")}
                    placeholder={t("placeHolder.password")}
                    required
                />

                <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
                    <FormCheckbox name='rememberMe' label={t("label.rememberMe")} />
                    <RouterLink
                        text={t("forgetPassword")}
                        to={paths.auth.forgetPassword}
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
