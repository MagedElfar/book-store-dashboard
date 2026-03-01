import { } from "react-i18next"

import { PageWrapper, PageTitle } from "@/shared/components"
import { useLocalize } from "@/shared/lib"

import { MyAccountForm } from "../forms"

function ProfilePage() {

    const { t } = useLocalize("account")

    return <PageWrapper>
        <PageTitle title={t("myAccount")} />

        <MyAccountForm />
    </PageWrapper>
}


export { ProfilePage }

export default ProfilePage