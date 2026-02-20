import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

// --- Icons ---

// --- Shared Components ---
import {
    RootPageTitle,
    DataTable,
    DataFilterToolbar,
    FilterSelect,
    PageWrapper,
    StatsBoard,
    type StatItem
} from "@/shared/components";
import { paths } from "@/shared/constants";
import { usePagination } from "@/shared/hooks";

// --- Local Components & Hooks ---
import { DeleteUserDialog } from "../components";
import { useGetUsers, useGetUsersStats, useUserColumns } from "../hooks";
import type { User, UsersParams } from "../types";

const getRoleOptions = (t: any) => [
    { value: "", label: t("role.all") },
    { value: "user", label: t("role.user") },
    { value: "support", label: t("role.support") },
    { value: "admin", label: t("role.admin") },
];

const getSortOptions = (t: any) => [
    { value: "newest", label: t("filter.newest") },
    { value: "oldest", label: t("filter.oldest") },
];

export default function UsersPage() {
    const { t } = useTranslation(["user", "common"]);
    const navigate = useNavigate();

    // --- Pagination Hook ---
    const { page, limit, handleLimitChange, handlePageChange, setPage } = usePagination();

    // --- Local State ---
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filters, setFilters] = useState<Omit<UsersParams, 'page' | 'limit'>>({
        search: "",
        role: "",
        sortBy: "newest"
    });

    // --- Data Fetching ---
    const { data: stats, isLoading: isLoadingStats } = useGetUsersStats();
    const { data, isLoading, isError, refetch } = useGetUsers({
        limit,
        page: page + 1,
        ...filters
    });

    // --- Memoized Columns ---
    const columns = useUserColumns(setSelectedUser);

    // --- Handlers ---
    const handleFilterChange = useCallback((key: keyof UsersParams, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPage(0); // العودة لأول صفحة عند تغيير الفلتر
    }, [setPage]);

    const handleResetFilters = useCallback(() => {
        setFilters({
            search: "",
            role: "",
            sortBy: "newest"
        });
        handlePageChange(null, 0);
    }, [handlePageChange]);

    // --- Memoized Stats Data ---
    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalUsers"),
            value: stats?.total_users || 0,
            icon: <PeopleIcon fontSize="large" />,
            color: 'primary',
            loading: isLoadingStats
        },
        {
            title: t("role.admin"),
            value: stats?.roles_count.admin || 0,
            icon: <AdminPanelSettingsIcon fontSize="large" />,
            color: 'info',
            loading: isLoadingStats
        },
        {
            title: t("role.support"),
            value: stats?.roles_count.support || 0,
            icon: <AdminPanelSettingsIcon fontSize="large" />, // يمكنك تغيير الأيقونة لو أحببت
            color: 'warning',
            loading: isLoadingStats
        },
        {
            title: t("role.user"),
            value: stats?.roles_count.user || 0,
            icon: <PeopleIcon fontSize="large" />,
            color: 'secondary',
            loading: isLoadingStats
        }
    ], [stats, isLoadingStats, t]);

    return (
        <PageWrapper>
            <RootPageTitle
                title={t("users")}
                btnText={t("createUser")}
                onClick={() => navigate(paths.dashboard.users.create)}
            />

            <StatsBoard
                items={statsItems}
            />

            <DataFilterToolbar
                searchValue={filters.search || ""}
                searchPlaceholder={t("filter.search")}
                onSearchChange={(val) => handleFilterChange("search", val)}
                onClear={handleResetFilters}
            >
                <FilterSelect
                    label={t("filter.role")}
                    value={filters.role || ""}
                    options={getRoleOptions(t)}
                    onChange={(val) => handleFilterChange("role", val)}
                />
                <FilterSelect
                    label={t("filter.sortBy")}
                    value={filters.sortBy || "newest"}
                    options={getSortOptions(t)}
                    onChange={(val) => handleFilterChange("sortBy", val)}
                />
            </DataFilterToolbar>

            <DataTable
                rows={data?.items || []}
                columns={columns}
                count={data?.total || 0}
                page={page}
                limit={limit}
                isLoading={isLoading}
                isError={isError}
                onRefetch={refetch}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />

            {selectedUser && <DeleteUserDialog
                open={Boolean(selectedUser)}
                userId={selectedUser.id}
                userName={selectedUser?.full_name}
                onClose={() => setSelectedUser(null)}
            />}
        </PageWrapper>
    );
}