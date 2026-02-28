import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";

import { BasicInfoStepSkeleton } from "../components";
import { BookForm } from "../form";
import { useGetBookById } from "../hooks";

export default function EditBookPage() {
    const { t } = useTranslation(["book", "common"]);
    const { id } = useParams<{ id: string }>();

    const { data: book, isLoading, isError, refetch } = useGetBookById(id!);


    return (
        <PageWrapper>
            <PageTitle
                nested
                withBackArrow
                title={t("titles.editBook")}
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={book}
                onRetry={refetch}
                loadingComponent={<BasicInfoStepSkeleton />}
            >
                {(data) => (
                    <BookForm book={data} />

                )}
            </DataHandler>
        </PageWrapper>
    );
}