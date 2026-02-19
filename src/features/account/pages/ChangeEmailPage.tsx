import { useTranslation } from "react-i18next"

import { PageTitle, PageWrapper } from "@/shared/components"

import { EmailForm } from "../forms"

function ProfilePage() {

    const { t } = useTranslation("account")

    return <PageWrapper>
        <PageTitle title={t("email")} />

        <EmailForm />
    </PageWrapper>
}


export { ProfilePage }

export default ProfilePage