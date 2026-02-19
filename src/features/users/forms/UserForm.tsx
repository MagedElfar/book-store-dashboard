import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { paths } from '@/shared/constants';
import { FormContainer, FormTextField, AppFormProvider, FormPhoneInput, FormPasswordField, FormSelectField } from '@/shared/form';
import { DropzoneField } from '@/shared/media';
import { errorMapper } from '@/shared/utilities';

import { useCreateUser, useUpdateUser } from '../hooks';
import { UserFormSchema, type UserFormSchemaType } from '../schema'
import type { CreateUserPayload, UpdateUserPayload, User } from '../types';

interface Props {
    user?: User
}

export function UserForm({ user }: Props) {

    const { t } = useTranslation("user")
    const { mutateAsync: createUser } = useCreateUser()
    const { mutateAsync: updateUser } = useUpdateUser()

    const navigate = useNavigate()

    const defaultValues: UserFormSchemaType = {
        phone: user?.phone || "",
        full_name: user?.full_name || "",
        avatar_url: user?.avatar_url || null,
        email: user?.email || "",
        role: user?.role ? user.role : "user",
        ...(!user && {
            password: ""
        })
    }


    const methods = useForm<UserFormSchemaType>({
        resolver: zodResolver(UserFormSchema(t, !user)),
        defaultValues,
    });

    const onsubmit = async (data: UserFormSchemaType) => {

        try {

            if (user) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { email, ...payload } = data
                await updateUser({ id: user.id, data: payload as UpdateUserPayload })
                toast.success(t("feedback.successUpdateUser"))
                navigate(paths.dashboard.users.details(user.id))
                return
            }

            await createUser(data as CreateUserPayload)

            toast.success(t("feedback.successCreateUser"))

            navigate(paths.dashboard.users.root)

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<UserFormSchemaType> methods={methods} onSubmit={onsubmit}>
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

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormTextField
                            name="email"
                            label={t("label.email")}
                            placeholder={t("placeHolder.email")}
                            required
                            disabled={!!user}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormPhoneInput
                            name="phone"
                            label={t("label.phone")}
                            placeholder={t("placeHolder.phone")}
                        />

                    </Grid>
                    {!user &&
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormPasswordField
                                name="password"
                                label={t("label.password")}
                                placeholder={t("placeHolder.password")}
                                required
                            />
                        </Grid>}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormSelectField
                            required
                            label={t("label.Role")}
                            name="role"
                            options={[
                                { value: "user", label: t("role.user") },
                                { value: "support", label: t("role.support") },
                                { value: "admin", label: t("role.admin") },
                            ]}
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
