import { useTranslation } from "react-i18next";

import { PageTitle, PageWrapper } from "@/shared/components";

import { BannerForm } from "../forms";

export default function CreateAuthorPage() {
    const { t } = useTranslation("banner");

    return (
        <PageWrapper>
            <PageTitle
                withBackArrow
                title={t("createBanner")}
            />
            <BannerForm />
        </PageWrapper>
    );
}