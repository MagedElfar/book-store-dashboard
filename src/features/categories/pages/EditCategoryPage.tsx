import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import { useLocalize } from "@/shared/lib";

import { CategoryFormSkeleton, DeleteCategoryDialog } from "../components";
import { CategoryForm } from "../forms";
import { useGetCategoryById } from "../hooks";

export default function EditCategoryPage() {
    const { t, getLocalizedValue } = useLocalize(["category", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: category, isLoading, isError, refetch } = useGetCategoryById(id!);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <PageWrapper>
            <PageTitle
                nested
                withBackArrow
                title={t("editCategory")}
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={category}
                onRetry={refetch}
                loadingComponent={<CategoryFormSkeleton />}
            >
                {(categoryData) => (
                    <>
                        <CategoryForm category={categoryData} />

                        <DeleteCategoryDialog
                            open={openDelete}
                            categoryId={categoryData.id}
                            categoryName={getLocalizedValue(categoryData)}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.categories.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}