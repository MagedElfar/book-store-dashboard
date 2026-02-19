import { useTranslation } from "react-i18next"

import { PageTitle, PageWrapper } from "@/shared/components"

import { ChangePasswordForm } from "../forms"

function ChangePasswordPage() {

    const { t } = useTranslation("account")

    return <PageWrapper>
        <PageTitle title={t("password")} />

        <ChangePasswordForm />
    </PageWrapper>
}


export { ChangePasswordPage }

export default ChangePasswordPage