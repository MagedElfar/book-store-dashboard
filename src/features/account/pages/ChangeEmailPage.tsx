import { PageTitle, PageWrapper } from "@/shared/components"
import { useLocalize } from "@/shared/lib"

import { EmailForm } from "../forms"

function ProfilePage() {

    const { t } = useLocalize("account")

    return <PageWrapper>
        <PageTitle title={t("email")} />

        <EmailForm />
    </PageWrapper>
}


export { ProfilePage }

export default ProfilePage