import { MenuItem, TextField } from '@mui/material'

import type { SelectOption, SelectValue } from '@/shared/types'

interface Props<T extends object> {
    label: string,
    value: SelectValue,
    onChange: (key: keyof T, value: SelectValue) => void;
    options: SelectOption[]
    inputKey: keyof T
}

export function FilterSelect<T extends object>({ label, value, onChange, options, inputKey }: Props<T>) {
    return (
        <TextField
            select
            size="small"
            label={label}
            value={value}
            onChange={(e) => onChange(inputKey, e.target.value)}
            sx={{ minWidth: 140 }}
            slotProps={{
                inputLabel: {
                    shrink: true
                },
                select: {
                    displayEmpty: true,
                }
            }}
        >
            {options.map(({ value, label }) => <MenuItem value={value} key={value}>
                {label}
            </MenuItem>)
            }
        </TextField>
    )
}
