import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import SearchIcon from "@mui/icons-material/Search";
import {
    Stack,
    TextField,
    InputAdornment,
    Button,
    Collapse,
    Box,
} from "@mui/material";
import { useDebounce } from "minimal-shared/hooks";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface DataFilterToolbarProps {
    searchPlaceholder?: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onClear?: () => void; // دالة المسح
    children?: React.ReactNode;
}

export function DataFilterToolbar({
    searchPlaceholder = "Search...",
    searchValue,
    onSearchChange,
    onClear,
    children
}: DataFilterToolbarProps) {
    const { t } = useTranslation("common");
    const [localSearch, setLocalSearch] = useState(searchValue);
    const [showFilters, setShowFilters] = useState(false);
    const debouncedSearch = useDebounce(localSearch, 500);

    useEffect(() => {
        // نرسل التحديث فقط إذا كان هناك تغيير حقيقي فعلاً عن القيمة القادمة من الخارج
        if (debouncedSearch !== searchValue) {
            onSearchChange(debouncedSearch);
        }
    }, [debouncedSearch, onSearchChange, searchValue]);
    const handleClearAll = () => {
        setLocalSearch(""); // مسح البحث محلياً فوراً
        if (onClear) onClear();
    };

    return (
        <Box sx={{ mb: 3 }}>
            {/* الجزء العلوي: البحث وزر الفلترة */}
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2, md: 4 }}
                alignItems="center"
                justifyContent="flex-end"
            >
                <TextField
                    size="small"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            ),
                        }
                    }}
                    sx={{ flexGrow: 1, width: { xs: '100%', sm: 300 } }}
                />

                <Button
                    variant={showFilters ? "outlined" : "contained"}
                    color="primary"
                    startIcon={showFilters ? <ExpandLessIcon /> : <FilterListIcon />}
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                >
                    {t("filter")}
                </Button>
            </Stack>

            <Collapse in={showFilters}>
                <Box
                    sx={{
                        mt: 2,
                        p: 2.5,
                        borderRadius: 1.5,
                        bgcolor: (theme) => theme.palette.mode === "light"
                            ? theme.palette.grey[50]
                            : theme.palette.grey[900],
                        border: (theme) => `1px dashed ${theme.palette.divider}`
                    }}
                >
                    <Stack
                        spacing={2}
                        alignItems="flex-end"
                        flexWrap="wrap"
                    >
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            width: "100%"
                        }}>
                            {children}
                        </Box>

                        <Button
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={handleClearAll}
                            startIcon={<FilterListOffIcon />}
                            sx={{ whiteSpace: 'nowrap', height: 'fit-content' }}
                        >
                            {t("clear")}
                        </Button>
                    </Stack>
                </Box>
            </Collapse>
        </Box>
    );
}