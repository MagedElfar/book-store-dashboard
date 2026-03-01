import { PageTitle, PageWrapper } from "@/shared/components";
import { useLocalize } from "@/shared/lib";

import { CreateOrderForm } from "../form";

export default function CreateOrderPage() {
    const { t } = useLocalize("order")

    return (
        <PageWrapper>
            <PageTitle withBackArrow title={t("createOrder")} />
            <CreateOrderForm />
        </PageWrapper>
    )
}
