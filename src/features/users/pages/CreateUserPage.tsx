import { PageTitle, PageWrapper } from "@/shared/components"
import { useLocalize } from "@/shared/lib"

import { UserForm } from "../forms"

export default function CreateUserPage() {

    const { t } = useLocalize("user")

    return <PageWrapper>
        <PageTitle withBackArrow title={t("createUser")} />
        <UserForm />
    </PageWrapper>
}

