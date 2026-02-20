import { useTranslation } from "react-i18next";

import { PageTitle, PageWrapper } from "@/shared/components";

import { CategoryForm } from "../forms";

export default function CreateCategoryPage() {
    const { t } = useTranslation("category");

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