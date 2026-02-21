import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import type { SupportedLang } from "@/shared/types";

import { CategoryFormSkeleton, DeleteCategoryDialog } from "../components";
import { CategoryForm } from "../forms";
import { useGetCategoryById } from "../hooks";

export default function EditCategoryPage() {
    const { t, i18n } = useTranslation(["category", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: category, isLoading, isError, refetch } = useGetCategoryById(id!);
    const [openDelete, setOpenDelete] = useState(false);

    const lang = i18n.language as SupportedLang;

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
                            categoryName={categoryData?.[`name_${lang}`]}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.categories.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}