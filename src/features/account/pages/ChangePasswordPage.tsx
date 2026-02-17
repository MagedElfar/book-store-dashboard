import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"

import { PageTitle } from "@/shared/components"

import { ChangePasswordForm } from "../forms"

function ChangePasswordPage() {

    const { t } = useTranslation("account")

    return <Box>
        <PageTitle title={t("password")} />

        <ChangePasswordForm />
    </Box>
}


export { ChangePasswordPage }

export default ChangePasswordPage