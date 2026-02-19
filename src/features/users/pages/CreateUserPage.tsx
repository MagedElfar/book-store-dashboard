import { useTranslation } from "react-i18next"

import { PageTitle, PageWrapper } from "@/shared/components"

import { UserForm } from "../forms"

export default function CreateUserPage() {

    const { t } = useTranslation("user")

    return <PageWrapper>
        <PageTitle withBackArrow title={t("createUser")} />
        <UserForm />
    </PageWrapper>
}

