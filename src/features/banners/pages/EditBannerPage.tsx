// src/features/authors/pages/EditAuthorPage.tsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import type { SupportedLang } from "@/shared/types";

import { DeleteBannerDialog } from "../components";
import { BannerForm } from "../forms";
import { useGetBannerById } from "../hooks";

export default function EditBannerPage() {
    const { t, i18n } = useTranslation(["banner", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: banner, isLoading, isError, refetch } = useGetBannerById(id!);
    const [openDelete, setOpenDelete] = useState(false);

    const lang = i18n.language as SupportedLang;

    return (
        <PageWrapper>
            <PageTitle
                nested
                withBackArrow
                title={t("editBanner")}
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={banner}
                onRetry={refetch}
            >
                {(bannerData) => (
                    <>
                        <BannerForm banner={banner} />

                        <DeleteBannerDialog
                            open={openDelete}
                            bannerId={bannerData.id}
                            bannerTitle={bannerData?.[`title_${lang}`]}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.authors.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}