import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

import { useAuthActions, useAuthState } from '@/features/auth';
import { FormContainer, FormTextField, AppFormProvider, FormPhoneInput } from '@/shared/form';
import { DropzoneField } from '@/shared/media';
import { errorMapper } from '@/shared/utilities';

import { AccountSchema, type AccountSchemaType } from '../schema'


export function MyAccountForm() {

    const { updateUser } = useAuthActions()
    const { user } = useAuthState()
    const { t } = useTranslation("account")

    const defaultValues: AccountSchemaType = {
        phone: user?.phone,
        full_name: user!.full_name,
        avatar_url: user?.avatar_url
    }


    const methods = useForm<AccountSchemaType>({
        resolver: zodResolver(AccountSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: AccountSchemaType) => {
        try {

            await updateUser(user!.id, data)

            toast.success(t("feedBack.successAccountUpdate"))
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<AccountSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer stackProps={{
                alignItems: "center"
            }}>

                <Grid container width="100%" spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <FormTextField
                            name="full_name"
                            label={t("label.fullName")}
                            placeholder={t("placeHolder.fullName")}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 12 }}>
                        <FormPhoneInput
                            name="phone"
                            label={t("label.phone")}
                            placeholder={t("placeHolder.phone")}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <DropzoneField
                            name="avatar_url"
                            label={t("label.avatar")}
                            maxSize={2 * 1024 * 1024} // 2 MB
                            accept={{
                                "image/jpeg": [".jpeg", ".jpg"],
                                "image/png": [".png"],
                                "image/webp": [".webp"]
                            }}
                        />
                    </Grid>

                </Grid>
            </FormContainer>
        </AppFormProvider>
    )
}
