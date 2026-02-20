import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { DataHandler, PageTitle, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";

import { DeleteUserDialog, FormSkeleton } from "../components";
import { UserForm } from "../forms";
import { useGetUserById } from "../hooks";

export default function EditUserPage() {
    const { t } = useTranslation(["user", "common"]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: user, isLoading, isError, refetch } = useGetUserById(id!);

    const [openDelete, setOpenDelete] = useState(false);

    return (
        <PageWrapper>
            <PageTitle
                nested
                withBackArrow
                title={t("editUser")}
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={user}
                onRetry={refetch}
                loadingComponent={<FormSkeleton />}
            >
                {(userData) => (
                    <>
                        <UserForm user={userData} />

                        <DeleteUserDialog
                            open={openDelete}
                            userId={userData.id}
                            userName={userData.full_name}
                            onClose={() => setOpenDelete(false)}
                            onRedirect={() => navigate(paths.dashboard.users.root)}
                        />
                    </>
                )}
            </DataHandler>
        </PageWrapper>
    );
}