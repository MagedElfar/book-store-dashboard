import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { RootPageTitle, DataTable, DataFilterToolbar, FilterSelect, PageWrapper } from "@/shared/components";
import { paths } from "@/shared/constants";
import { usePagination } from "@/shared/hooks";

import { DeleteUserDialog } from "../components";
import { useGetUsers, useUserColumns } from "../hooks";
import type { User, UsersParams } from "../types";

export default function UsersPage() {
    const { t } = useTranslation("user");
    const navigate = useNavigate();



    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filters, setFilters] = useState<Omit<UsersParams, 'page' | 'limit'>>({
        search: "",
        role: "",
        sortBy: "newest"
    });

    const { page, limit, handleLimitChange, handlePageChange, setPage } = usePagination();

    const handleSetSelectedUser = useCallback((user: User) => {
        setSelectedUser(user);
    }, []);


    const handleFilterChange = useCallback((key: keyof UsersParams, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPage(0);
    }, [setPage]);

    const handleResetFilters = useCallback(() => {
        setFilters({
            search: "",
            role: "",
            sortBy: "newest"
        });
        handlePageChange(null, 0);
    }, [handlePageChange]);


    const { data, isLoading, isError, refetch } = useGetUsers({
        limit,
        page: page + 1,
        ...filters
    });

    const columns = useUserColumns(handleSetSelectedUser);

    return (
        <PageWrapper>
            <RootPageTitle
                onClick={() => navigate(paths.dashboard.users.create)}
                btnText={t("createUser")}
                title={t("users")}
            />

            <DataFilterToolbar
                searchValue={filters.search || ""}
                searchPlaceholder={t("filter.search")}
                onSearchChange={(val) => handleFilterChange("search", val)}
                onClear={handleResetFilters}
            >
                <FilterSelect
                    onChange={(val) => handleFilterChange("role", val)}
                    label={t("filter.role")}
                    value={filters.role || ""}
                    options={[
                        { value: "", label: t("role.all") },
                        { value: "user", label: t("role.user") },
                        { value: "support", label: t("role.support") },
                        { value: "admin", label: t("role.admin") },
                    ]}
                />
                <FilterSelect
                    onChange={(val) => handleFilterChange("sortBy", val)}
                    label={t("filter.sortBy")}
                    value={filters.sortBy || "newest"}
                    options={[
                        { value: "newest", label: t("filter.newest") },
                        { value: "oldest", label: t("filter.oldest") },
                    ]}
                />
            </DataFilterToolbar>

            <DataTable
                columns={columns}
                rows={data?.items || []}
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
                userId={selectedUser?.id}
                userName={selectedUser?.full_name}
                onClose={() => setSelectedUser(null)}
            />}
        </PageWrapper>
    );

    // return <div>users</div>
}