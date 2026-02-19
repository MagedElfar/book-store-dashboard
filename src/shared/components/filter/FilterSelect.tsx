import { MenuItem, TextField } from '@mui/material'

import type { SelectOption, SelectValue } from '@/shared/types'

interface Props {
    label: string,
    value: SelectValue,
    onChange: (value: SelectValue) => void;
    options: SelectOption[]
}

export function FilterSelect({ label, value, onChange, options }: Props) {
    return (
        <TextField
            select
            size="small"
            label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            sx={{ minWidth: 140 }}
            slotProps={{
                inputLabel: {
                    shrink: true
                },
                select: {
                    displayEmpty: true,
                    renderValue: (selected) => {
                        const option = options.find(o => o.value === selected);
                        return option?.label ?? "";
                    }

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
