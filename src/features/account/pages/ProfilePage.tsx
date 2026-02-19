import { useTranslation } from "react-i18next"

import { PageWrapper, PageTitle } from "@/shared/components"

import { MyAccountForm } from "../forms"

function ProfilePage() {

    const { t } = useTranslation("account")

    return <PageWrapper>
        <PageTitle title={t("myAccount")} />

        <MyAccountForm />
    </PageWrapper>
}


export { ProfilePage }

export default ProfilePage