import { FormControlLabel, Switch } from '@mui/material'
import { useFormContext, useWatch } from 'react-hook-form'

interface Props {
    label: string
    name: string
}

export function FormSwitch({ label, name }: Props) {
    const { control, setValue } = useFormContext()
    return <FormControlLabel
        control={
            <Switch
                checked={useWatch({ control, name })}
                onChange={(e) => setValue(name, e.target.checked)}
            />
        }
        label={label}
    />
}
