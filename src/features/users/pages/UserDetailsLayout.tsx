import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";

import { NestedLayout } from "@/layouts";
import { useLocalize } from "@/shared/lib";

export default function UserDetailsLayout() {
    const { t } = useLocalize(["user", "common"]);
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