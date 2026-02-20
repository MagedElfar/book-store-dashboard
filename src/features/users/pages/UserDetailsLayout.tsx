import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { NestedLayout } from "@/layouts";

export default function UserDetailsLayout() {
    const { t } = useTranslation(["user", "common"]);
    const { id } = useParams();

    const tabs = [
        {
            label: t("info.personalDetails"),
            path: "",
            icon: <PersonIcon />
        },
        {
            label: t("info.userAddresses"),
            path: "addresses",
            icon: <MapIcon />
        },
    ];

    return (
        <NestedLayout
            pageTitle={t("userDetails")}
            tabs={tabs}
            basePath={`/dashboard/users/${id}`}
        />
    );
}