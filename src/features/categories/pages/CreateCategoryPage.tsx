import { PageTitle, PageWrapper } from "@/shared/components";
import { useLocalize } from "@/shared/lib";

import { CategoryForm } from "../forms";

export default function CreateCategoryPage() {
    const { t } = useLocalize("category");

    return (
        <PageWrapper>
            <PageTitle
                withBackArrow
                title={t("createCategory")}
            />
            <CategoryForm />
        </PageWrapper>
    );
}