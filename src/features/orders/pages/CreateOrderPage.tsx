import { useTranslation } from "react-i18next";

import { PageTitle, PageWrapper } from "@/shared/components";

import { CreateOrderForm } from "../form";

export default function CreateOrderPage() {
    const { t } = useTranslation("order")

    return (
        <PageWrapper>
            <PageTitle withBackArrow title={t("createOrder")} />

            <CreateOrderForm />
        </PageWrapper>
    )
}
