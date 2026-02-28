import { rectSortingStrategy } from "@dnd-kit/sortable";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import {
    Grid, Box, Stack, Skeleton,
    Button, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import {
    RootPageTitle,
    DataFilterToolbar,
    FilterSelect,
    PageWrapper,
    DataHandler,
    SortableList,
    FullSortableFileItem
} from "@/shared/components";
import { paths } from "@/shared/constants";
import { useDialog } from '@/shared/hooks/useDialog';

import { BannerCard, DeleteBannerDialog } from "../components";
import { useBannerReorder, useGetInfiniteBanners } from "../hooks";
import type { Banner, BannersParams } from "../types";

const getStatusOptions = (t: any) => [
    { value: "", label: t("common:status.all") },
    { value: "active", label: t("common:status.active") },
    { value: "inactive", label: t("common:status.inactive") },
];

const getSortOptions = (t: any) => [
    { value: "newest", label: t("filter.newest") },
    { value: "oldest", label: t("filter.oldest") },
    { value: "priority", label: t("filter.priority") },
];

const DEFAULT_FILTERS: Omit<BannersParams, "page" | "limit"> = {
    search: "",
    is_active: "",
    sortBy: "priority"
};

export default function BannersPage() {
    const { t } = useTranslation(["banner", "common"]);
    const navigate = useNavigate();

    const [isReordering, setIsReordering] = useState(false);


    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const {
        data: selectedBanner,
        isDelete,
        openDelete,
        closeDialog,
    } = useDialog<Banner>();

    const {
        data,
        isError,
        refetch,
        isLoading,
        hasNextPage, fetchNextPage, isFetchingNextPage
    } = useGetInfiniteBanners(filters, true);

    const banners = useMemo(() => {
        return data?.pages.flatMap(p => p.items) || []
    }, [data?.pages])

    const {
        items,
        handleReorder,
        saveOrder,
        resetOrder,
        isSaving,
        hasChanges
    } = useBannerReorder(banners || []);

    const handleFilterChange = useCallback((key: keyof BannersParams, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleResetFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
    }, []);

    const handleToggleMode = (_: any, nextMode: boolean | null) => {
        if (nextMode !== null) {
            if (!nextMode && hasChanges) {
                resetOrder();
            }
            setIsReordering(nextMode);
        }
    };

    const onEdit = useCallback((id: string) => navigate(paths.dashboard.banners.edit(id)), [navigate])

    const onDelete = useCallback((banner: Banner) => openDelete(banner), [openDelete])

    const BannersLoading = (
        <Grid container spacing={3}>
            {[...Array(6)].map((_, i) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
                    <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3 }} />
                </Grid>
            ))}
        </Grid>
    );

    const listItems = isReordering ? items : banners;
    const itemIds = useMemo(() => items.map(b => b.id), [items]);


    return (
        <PageWrapper>
            <RootPageTitle
                title={t("banners")}
                btnText={t("createBanner")}
                onClick={!isReordering ? () => navigate(paths.dashboard.banners.create) : undefined}
            />

            {!isReordering && (
                <DataFilterToolbar
                    searchValue={filters.search || ""}
                    searchPlaceholder={t("label.titleEn")}
                    onSearchChange={(val) => handleFilterChange("search", val)}
                    onClear={handleResetFilters}
                >
                    <FilterSelect
                        label={t("filter.status")}
                        value={filters.is_active || ""}
                        options={getStatusOptions(t)}
                        onChange={(val) => handleFilterChange("is_active", val)}
                    />
                    <FilterSelect
                        label={t("filter.sortBy")}
                        value={filters.sortBy || "priority"}
                        options={getSortOptions(t)}
                        onChange={(val) => handleFilterChange("sortBy", val)}
                    />
                </DataFilterToolbar>
            )}

            <Stack direction="row" spacing={2} alignItems="center">
                <ToggleButtonGroup
                    value={isReordering}
                    exclusive
                    onChange={handleToggleMode}
                    size="small"
                    color="primary"
                >
                    <ToggleButton value={false}>
                        <ViewModuleIcon sx={{ mr: 1, fontSize: 18 }} /> {t("actions.display")}
                    </ToggleButton>
                    <ToggleButton value={true}>
                        <SwapVertIcon sx={{ mr: 1, fontSize: 18 }} /> {t("actions.reorder")}
                    </ToggleButton>
                </ToggleButtonGroup>

                {isReordering && (
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<SaveIcon />}
                            onClick={() => saveOrder(() => setIsReordering(false))}
                            disabled={isSaving || !hasChanges}
                        >
                            {t("actions.save")}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<CloseIcon />}
                            onClick={() => {
                                resetOrder();
                                setIsReordering(false);
                            }}
                            disabled={isSaving}
                        >
                            {t("actions.cancel")}
                        </Button>
                    </Stack>
                )}
            </Stack>

            <Box sx={{ mt: 3, mb: 5 }}>
                <DataHandler
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                    onRetry={refetch}
                    loadingComponent={BannersLoading}
                    isEmpty={listItems.length === 0}
                >
                    {() => (
                        <Stack width="100%" spacing={2} alignItems="center">
                            <SortableList
                                itemIds={itemIds}
                                onReorder={handleReorder}
                                strategy={rectSortingStrategy}
                                disabled={!isReordering}
                            >
                                <Grid container spacing={3}>
                                    {listItems.map((banner) => (
                                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={banner.id}>
                                            <FullSortableFileItem id={banner.id} disabled={!isReordering}>
                                                <BannerCard
                                                    isDirigible={isReordering}
                                                    banner={banner}
                                                    onEdit={onEdit}
                                                    onDelete={onDelete}
                                                />
                                            </FullSortableFileItem>
                                        </Grid>
                                    ))}
                                </Grid>
                            </SortableList>

                            {hasNextPage && <Button
                                loading={isFetchingNextPage}
                                disabled={isFetchingNextPage}
                                onClick={() => fetchNextPage()}
                                variant="contained"
                                size="large"
                            >
                                {t("common:actions.loadMore")}
                            </Button>}
                        </Stack>
                    )}
                </DataHandler>
            </Box>

            {selectedBanner && isDelete && (
                <DeleteBannerDialog
                    open
                    bannerId={selectedBanner.id}
                    bannerTitle={selectedBanner.title_en}
                    onClose={closeDialog}
                />
            )}
        </PageWrapper>
    );
}