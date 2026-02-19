import { useState, useCallback, useMemo } from "react";

import { API_RECORDED_LIMIT } from "@/core";

export function usePagination(initialLimit = API_RECORDED_LIMIT) {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(initialLimit);

    const handlePageChange = useCallback((_: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleLimitChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    return useMemo(() => ({
        page,
        limit,
        setPage,
        setLimit,
        handlePageChange,
        handleLimitChange,
    }), [page, limit, handlePageChange, handleLimitChange]);
}