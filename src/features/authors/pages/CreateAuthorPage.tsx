import { PageTitle, PageWrapper } from "@/shared/components";
import { useLocalize } from "@/shared/lib";

import { AuthorForm } from "../forms";

export default function CreateAuthorPage() {
    const { t } = useLocalize("author");

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