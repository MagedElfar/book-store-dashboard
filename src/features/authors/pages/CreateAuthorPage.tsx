import { useTranslation } from "react-i18next";

import { PageTitle, PageWrapper } from "@/shared/components";

import { AuthorForm } from "../forms";

export default function CreateAuthorPage() {
    const { t } = useTranslation("author");

    return (
        <PageWrapper>
            <PageTitle
                withBackArrow
                title={t("createAuthor")}
            />
            <AuthorForm />
        </PageWrapper>
    );
}