import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Skeleton,
    Typography,
    Box,
    Stack,
    Button,
    alpha
} from "@mui/material";
import { useTranslation } from 'react-i18next';

import type { Column } from "@/shared/types";

interface DataTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    count: number;
    page: number; // MUI page (starts from 0)
    limit: number;
    isLoading?: boolean;
    isError?: boolean;
    onPageChange: (event: unknown, newPage: number) => void;
    onLimitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRefetch?: () => void;
}

export function DataTable<T>({
    columns,
    rows,
    count,
    page,
    limit,
    isLoading,
    isError,
    onPageChange,
    onLimitChange,
    onRefetch
}: DataTableProps<T>) {

    const { t } = useTranslation("common")

    const totalColumns = columns.length;

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                overflow: 'hidden'
            }}
        >
            <TableContainer
                sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                    maxHeight: 600,
                    // تخصيص شكل الـ Scrollbar
                    '&::-webkit-scrollbar': {
                        height: '6px', // عرض الشريط الأفقي
                        width: '6px',  // عرض الشريط الرأسي
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: (theme) => theme.palette.background.default,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: (theme) => theme.palette.divider,
                        borderRadius: '10px',
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.text.disabled,
                        },
                    },
                    // للمتصفحات التي تدعم خاصية scrollbar-width (مثل Firefox)
                    scrollbarWidth: 'thin',
                    scrollbarColor: (theme) => `${theme.palette.divider} transparent`,
                }}
            >
                <Table
                    stickyHeader
                    sx={{
                        tableLayout: 'auto',
                        minWidth: "100%",
                        '& th, & td': {
                            whiteSpace: 'nowrap',
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.label}
                                    align={column.align || "left"}
                                    sx={{
                                        fontWeight: 'bold',
                                        bgcolor: 'background.neutral',
                                        color: 'text.secondary',
                                        whiteSpace: 'nowrap',
                                        py: 2
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* 1. Loading State */}
                        {isLoading ? (
                            Array.from({ length: limit }).map((_, idx) => (
                                <TableRow key={idx}>
                                    {columns.map((_, colIdx) => (
                                        <TableCell key={colIdx} sx={{ py: 2 }}>
                                            <Skeleton variant="text" height={30} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : isError ? (
                            /* 2. Error State */
                            <TableRow>
                                <TableCell colSpan={totalColumns}>
                                    <Stack spacing={2} sx={{ py: 10, textAlign: 'center', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                borderRadius: '50%',
                                                bgcolor: (theme) => alpha(theme.palette.error.main, 0.1)
                                            }}
                                        >
                                            <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" gutterBottom>
                                                {t("errorFallback.noRecords")}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {t("errorFallback.noRecordsMsg")}
                                            </Typography>
                                        </Box>
                                        {onRefetch && (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<RefreshIcon />}
                                                onClick={onRefetch}
                                                size="small"
                                            >
                                                {t("errorFallback.tryAgain")}
                                            </Button>
                                        )}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ) : rows.length === 0 ? (
                            /* 3. Empty State */
                            <TableRow>
                                <TableCell colSpan={totalColumns}>
                                    <Stack spacing={1} sx={{ py: 12, textAlign: 'center', alignItems: 'center' }}>
                                        <SearchOffIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
                                        <Typography variant="h6" color="text.secondary">
                                            {t("notFound.noRecords")}
                                        </Typography>
                                        <Typography variant="body2" color="text.disabled">
                                            {t("notFound.noRecordsMsg")}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ) : (
                            /* 4. Data State */
                            rows.map((row, rowIndex) => (
                                <TableRow
                                    hover
                                    key={rowIndex}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {columns.map((column) => {
                                        const value = column.id !== "actions" ? (row[column.id as keyof T]) : null;
                                        return (
                                            <TableCell
                                                key={column.label}
                                                align={column.align || "left"}
                                                sx={{ py: 1.5, whiteSpace: 'nowrap' }}
                                            >
                                                {column.render ? column.render(value, row) : (value as string)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={count}
                rowsPerPage={limit}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onLimitChange}
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    bgcolor: 'background.paper'
                }}
            />
        </Paper>
    );
}