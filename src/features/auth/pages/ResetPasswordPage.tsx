import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ErrorRedirect } from "@/shared/components";
import { paths } from "@/shared/constants";

import { ResetPasswordForm } from "../forms";

function ResetPasswordPage() {

    const { t } = useTranslation("auth")

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const error = params.get("error");
        const errorDescription = params.get("error_description");

        if (error) {
            const message = decodeURIComponent(
                errorDescription || t("errorContent.resetLinkInvalid.description")
            );

            setErrorMessage(message);
        }
    }, [t]);

    return <>
        {
            errorMessage ?
                <ErrorRedirect
                    title={t("errorContent.resetLinkInvalid.title")}
                    content={errorMessage}
                    btnText={t("errorContent.resetLinkInvalid.button")}
                    redirectPath={paths.auth.forgetPassword}
                />
                :
                <ResetPasswordForm />
        }
    </>

}


export default ResetPasswordPage;

export { ResetPasswordPage }