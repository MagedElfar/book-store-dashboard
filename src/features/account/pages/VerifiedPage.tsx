import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SuccessRedirect, ErrorRedirect } from "@/shared/components";
import { paths } from "@/shared/constants";

interface VerifiedPageProps {
    rootPath?: string;
}

const VerifiedPage: React.FC<VerifiedPageProps> = ({
    rootPath = paths.account.root,
}) => {
    const { t } = useTranslation("account");

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const error = params.get("error");
        const errorDescription = params.get("error_description");

        if (error) {
            const message = decodeURIComponent(
                errorDescription || t("verified.errorContent")
            );

            setErrorMessage(message);
        }
    }, [t]);

    return (
        <>
            {
                errorMessage ?
                    <ErrorRedirect
                        title={t("verified.errorTitle", "Verification Failed")}
                        content={errorMessage}
                        btnText={t("verified.errorBtn")}
                        redirectPath={paths.account.root}
                    />
                    :
                    <SuccessRedirect
                        title={t("verified.title")}
                        content={t("verified.content")}
                        btnText={t("verified.btn")}
                        redirectPath={rootPath}
                    />
            }
        </>

    );
};

export default VerifiedPage;
