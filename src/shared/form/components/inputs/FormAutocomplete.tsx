import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, TextField, CircularProgress, Checkbox, Box, Avatar } from "@mui/material";
import { useDebounce } from 'minimal-shared/hooks';
import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { AutocompleteOptions } from '@/shared/types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export type OptionValue<T> = AutocompleteOptions<T> | AutocompleteOptions<T>[] | null;

interface Props<T> {
    name: string;
    label: string;
    options: AutocompleteOptions<T>[];
    loading?: boolean;
    multiple?: boolean;
    placeholder?: string;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage?: () => void;
    onSearchChange?: (value: string) => void;
    defaultValue: OptionValue<T>,
    onOpen?: () => void,
    handleSelect?: (val: OptionValue<T>) => void
}

export function FormAutocomplete<T>({
    name, label, options, loading, multiple, placeholder,
    hasNextPage, isFetchingNextPage, fetchNextPage, onSearchChange, defaultValue,
    onOpen, handleSelect
}: Props<T>) {
    const { control, setValue } = useFormContext();

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
        <Controller
            name={name}
            control={control}
            render={({ fieldState: { error } }) => {
                return (
                    <Autocomplete
                        onFocus={() => onOpen?.()}
                        multiple={multiple}
                        options={options}
                        loading={loading}
                        defaultValue={defaultValue}
                        onInputChange={(_, newInputValue) => {
                            setSearchTerm(newInputValue);
                        }}

                        filterOptions={(x) => x}

                        onChange={(_, newValue) => {
                            setValue(name, newValue)
                            handleSelect?.(newValue)
                            setSearchTerm("");
                        }}

                        isOptionEqualToValue={(option, val) => option.value === (val?.value ?? val)}

                        disableCloseOnSelect={multiple}
                        getOptionLabel={(option) => option.label || ""}

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
                                        src={option?.image || undefined}
                                        sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}
                                    >
                                        {option.label?.[0]?.toUpperCase()}
                                    </Avatar>
                                    <Box component="span" sx={{ fontSize: '0.875rem', flexGrow: 1 }}>
                                        {option.label}
                                    </Box>
                                    {isFetchingNextPage && options.indexOf(option) === options.length - 1 && (
                                        <CircularProgress size={20} sx={{ ml: 1 }} />
                                    )}
                                </li>
                            );
                        }}

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                placeholder={placeholder}
                                error={!!error}
                                helperText={error?.message}
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
            }}
        />
    );
}