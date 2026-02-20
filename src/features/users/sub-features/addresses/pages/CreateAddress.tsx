import { useTranslation } from "react-i18next";

import { PageTitle, PageWrapper } from "@/shared/components";

import { AddressForm } from "../forms";

export default function CreateAddress() {
    const { t } = useTranslation("address")
    return (
        <PageWrapper>
            <PageTitle withBackArrow nested title={t("titles.createAddress")} />
            <AddressForm />
        </PageWrapper>
    )
}
