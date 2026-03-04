import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import { useMemo } from "react";
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
import { useDialog, useQueryFilters } from "@/shared/hooks";
// --- Local Components & Hooks ---
import { useLocalize } from '@/shared/lib';

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

const DEFAULT_FILTERS: UsersParams = {
    search: "",
    role: "all",
    sortBy: "newest"
}

export default function UsersPage() {
    const { t } = useLocalize(["user", "common"]);
    const navigate = useNavigate();

    // --- Local State ---
    const {
        data: selectedUser,
        isDelete,
        openDelete,
        closeDialog,
    } = useDialog<User>();

    const {
        filters,
        handleFilterChange,
        handleResetFilters,
        handleLimitChange,
        handlePageChange,
        page,
        limit
    } = useQueryFilters(DEFAULT_FILTERS);

    // --- Data Fetching ---
    const { data: stats, isLoading: isLoadingStats } = useGetUsersStats();
    const { data, isLoading, isError, refetch } = useGetUsers({
        limit,
        page: page + 1,
        ...filters
    });

    // --- Memoized Columns ---
    const columns = useUserColumns(openDelete);

    // --- Memoized Stats Data ---
    const statsItems: StatItem[] = useMemo(() => [
        {
            title: t("stats.totalUsers"),
            value: stats?.total_users || 0,
            icon: <PeopleIcon fontSize="large" />,
            color: 'primary',
            loading: isLoadingStats,
            growth: stats?.growth_percentage,
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

    const roleOptions = useMemo(() => getRoleOptions(t), [t])
    const sortOptions = useMemo(() => getSortOptions(t), [t])


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
                onSearchChange={handleFilterChange}
                onClear={handleResetFilters}
            >
                <FilterSelect
                    label={t("filter.role")}
                    value={filters.role || "all"}
                    options={roleOptions}
                    onChange={handleFilterChange}
                    inputKey="role"
                />
                <FilterSelect
                    label={t("filter.sortBy")}
                    value={filters.sortBy || "newest"}
                    options={sortOptions}
                    onChange={handleFilterChange}
                    inputKey="sortBy"
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
                open={isDelete}
                userId={selectedUser.id}
                userName={selectedUser?.full_name}
                onClose={closeDialog}
            />}
        </PageWrapper>
    );
}