import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import { useLocalize } from "@/shared/lib";

import { AuthorFormSkeleton, DeleteAuthorDialog } from "../components";
import { AuthorForm } from "../forms";
import { useGetAuthorById } from "../hooks";

export default function EditAuthorPage() {
    const { t, getLocalizedValue } = useLocalize(["author", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: author, isLoading, isError, refetch } = useGetAuthorById(id!);
    const [openDelete, setOpenDelete] = useState(false);


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
                            authorName={getLocalizedValue(authorData)}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.authors.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}