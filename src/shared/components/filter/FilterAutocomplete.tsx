import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, TextField, CircularProgress, Checkbox, Box, Avatar } from "@mui/material";
import { useDebounce } from 'minimal-shared/hooks';
import React, { useState, useEffect } from "react";

import type { AutocompleteOptions } from '@/shared/types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


interface Props<T> {
    label: string;
    value: any;
    onChange: (value: any) => void;
    options: AutocompleteOptions<T>[];
    loading?: boolean;
    multiple?: boolean;
    placeholder?: string;
    onSearchChange?: (value: string) => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage?: () => void;
    onOpen?: () => void
}

export function FilterAutocomplete<T>({
    label,
    value,
    onChange,
    options,
    loading,
    multiple,
    placeholder,
    onSearchChange,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    onOpen
}: Props<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        onSearchChange?.(debouncedSearch);
    }, [debouncedSearch, onSearchChange]);

    const handleScroll = (event: React.SyntheticEvent) => {
        const listboxNode = event.currentTarget;
        if (hasNextPage && !isFetchingNextPage &&
            listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 1
        ) {
            fetchNextPage?.();
        }
    };


    return (
        <Autocomplete
            size="small"
            onFocus={() => onOpen?.()}
            multiple={multiple}
            options={options}
            loading={loading}
            defaultValue={value}
            filterOptions={(x) => x}
            onInputChange={(_, newVal) => setSearchTerm(newVal)}
            onChange={(_, newValue: any) => {
                if (multiple) {
                    onChange(newValue.map((v: any) => v.value));
                } else {
                    onChange(newValue?.value ?? "");
                    setSearchTerm("")
                }

            }}
            isOptionEqualToValue={(option, val) => option.value === (val?.value ?? val)}
            getOptionLabel={(option) => option?.label || ""}
            disableCloseOnSelect={multiple}
            slotProps={{
                listbox: {
                    onScroll: handleScroll,
                    sx: { maxHeight: '300px' }
                }
            }}
            renderOption={(props, option, { selected }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { key, ...otherProps } = props as any;
                return (
                    <li key={option.value} {...otherProps}>
                        {multiple && (
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                        )}
                        <Avatar
                            alt={option.label}
                            src={option?.image}
                            sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}
                        >
                            {option.label?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box component="span" sx={{ fontSize: '0.875rem' }}>
                            {option.label}
                        </Box>
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    sx={{ minWidth: 200 }}
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }
                    }}
                />
            )}
        />
    );
}