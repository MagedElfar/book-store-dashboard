import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { API_RECORDED_LIMIT } from '@/core';

export function useQueryFilters<T extends Record<string, any>>(defaultFilters: T) {
    const [searchParams, setSearchParams] = useSearchParams();


    const filters = useMemo(() => {
        return Object.keys(defaultFilters).reduce((acc, key) => {
            const value = searchParams.get(key);
            // @ts-expect-error - dynamic key assignment
            acc[key] = value !== null ? value : defaultFilters[key];
            return acc;
        }, {} as T);
    }, [defaultFilters, searchParams]);

    const page = Number(searchParams.get("page") || 1) - 1;
    const limit = Number(searchParams.get("limit")) || API_RECORDED_LIMIT

    const handleFilterChange = useCallback((key: keyof T, value: any) => {
        setSearchParams((prev) => {

            const currentValue = prev.get(key as string) ?? defaultFilters[key];

            if (String(currentValue) === String(value)) {
                return prev;
            }

            const newParams = new URLSearchParams(prev);
            if (value === "" || value === null || value === undefined || value === defaultFilters[key]) {
                newParams.delete(key as string);
            } else {
                newParams.set(key as string, value.toString());
            }

            newParams.set("page", "1");
            return newParams;
        });
    }, [setSearchParams, defaultFilters]);

    const handlePageChange = useCallback((_: any, newPage: number) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", (newPage + 1).toString());
            return newParams;
        });
    }, [setSearchParams]);

    const handleLimitChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("limit", event.target.value);
            newParams.set("page", "1");
            return newParams;
        });
    }, [setSearchParams]);

    const handleResetFilters = useCallback(() => {
        setSearchParams({});
    }, [setSearchParams]);

    return useMemo(() => ({
        filters,
        page,
        limit,
        handleFilterChange,
        handlePageChange,
        handleLimitChange,
        handleResetFilters
    }), [filters, page, limit, handleFilterChange, handlePageChange, handleLimitChange, handleResetFilters]);
}