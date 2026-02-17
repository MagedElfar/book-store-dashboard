import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"

import { PageTitle } from "@/shared/components"

import { EmailForm } from "../forms"

function ProfilePage() {

    const { t } = useTranslation("account")

    return <Box>
        <PageTitle title={t("email")} />

        <EmailForm />
    </Box>
}


export { ProfilePage }

export default ProfilePage