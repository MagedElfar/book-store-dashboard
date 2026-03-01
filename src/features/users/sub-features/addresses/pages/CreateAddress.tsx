import { PageTitle, PageWrapper } from "@/shared/components";
import { useLocalize } from "@/shared/lib";

import { AddressForm } from "../forms";

export default function CreateAddress() {
    const { t } = useLocalize("address")
    return (
        <PageWrapper>
            <PageTitle withBackArrow nested title={t("titles.createAddress")} />
            <AddressForm />
        </PageWrapper>
    )
}
