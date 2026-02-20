import { Tabs, Tab, Box } from "@mui/material";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { PageTitle, PageWrapper } from "@/shared/components";

interface TabConfig {
    label: string;
    path: string; // The sub-path, e.g., "" or "addresses"
    icon?: React.ReactElement;
}

interface GenericTabsLayoutProps {
    pageTitle: string;
    tabs: TabConfig[];
    basePath: string; // The base URL, e.g., "/dashboard/users/123"
}

export function NestedLayout({ pageTitle, tabs, basePath }: GenericTabsLayoutProps) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const getActiveTab = () => {
        // 1. Get the current sub-path relative to basePath
        const currentSubPath = pathname.replace(basePath, "").replace(/^\//, "");

        // 2. Find the tab that matches the start of the current path
        const index = tabs.findIndex((tab) => {
            if (tab.path === "") return currentSubPath === ""; // Exact match for index tab
            return currentSubPath.startsWith(tab.path); // Sub-paths match (e.g., addresses/create starts with addresses)
        });

        return index === -1 ? 0 : index;
    };
    const handleTabChange = (_: any, newValue: number) => {
        const targetPath = tabs[newValue].path;
        // Construct the clean navigation path
        const fullPath = targetPath ? `${basePath}/${targetPath}` : basePath;
        navigate(fullPath);
    };

    return (
        <PageWrapper>
            <PageTitle withBackArrow title={pageTitle} />

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3, flexGrow: 1 }}>
                <Tabs
                    value={getActiveTab()}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition="start"
                            sx={{ minHeight: 48 }}
                        />
                    ))}
                </Tabs>
            </Box>

            {/* Render the nested route content */}
            <Outlet />
        </PageWrapper>
    );
}