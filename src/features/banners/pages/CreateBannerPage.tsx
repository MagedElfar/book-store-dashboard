import { PageTitle, PageWrapper } from "@/shared/components";
import { useLocalize } from "@/shared/lib";

import { BannerForm } from "../forms";

export default function CreateAuthorPage() {
    const { t } = useLocalize("banner");

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