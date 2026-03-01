import { PageTitle, PageWrapper } from "@/shared/components"
import { useLocalize } from "@/shared/lib"

import { ChangePasswordForm } from "../forms"

function ChangePasswordPage() {

    const { t } = useLocalize("account")

    return <PageWrapper>
        <PageTitle title={t("password")} />

        <ChangePasswordForm />
    </PageWrapper>
}


export { ChangePasswordPage }

export default ChangePasswordPage