import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import { useLocalize } from "@/shared/lib";

import { DeleteBannerDialog } from "../components";
import { BannerForm } from "../forms";
import { useGetBannerById } from "../hooks";

export default function EditBannerPage() {
    const { t, getLocalizedValue } = useLocalize(["banner", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: banner, isLoading, isError, refetch } = useGetBannerById(id!);
    const [openDelete, setOpenDelete] = useState(false);

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
                            bannerTitle={getLocalizedValue(bannerData, "title")}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.authors.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}