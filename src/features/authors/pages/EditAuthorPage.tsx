// src/features/authors/pages/EditAuthorPage.tsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";

import { AuthorFormSkeleton, DeleteAuthorDialog } from "../components";
import { AuthorForm } from "../forms";
import { useGetAuthorById } from "../hooks";

export default function EditAuthorPage() {
    const { t, i18n } = useTranslation(["author", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: author, isLoading, isError, refetch } = useGetAuthorById(id!);
    const [openDelete, setOpenDelete] = useState(false);

    const isAr = i18n.language === "ar";

    return (
        <PageWrapper>
            <PageTitle
                nested
                withBackArrow
                title={t("editAuthor")}
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={author}
                onRetry={refetch}
                loadingComponent={<AuthorFormSkeleton />}
            >
                {(authorData) => (
                    <>
                        <AuthorForm author={authorData} />

                        <DeleteAuthorDialog
                            open={openDelete}
                            authorId={authorData.id}
                            authorName={isAr ? authorData.name_ar : authorData.name_en}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.authors.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}