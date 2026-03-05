import { FormControlLabel, Switch, Box, Typography } from '@mui/material';

interface Props<T extends object> {
    label: string;
    checked: boolean;
    onChange: (key: keyof T, value: boolean) => void;
    inputKey: keyof T;
    description?: string;
}

export function FilterSwitch<T extends object>({
    label,
    checked,
    onChange,
    inputKey,
    description
}: Props<T>) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={(e) => onChange(inputKey, e.target.checked)}
                        size="small"
                        color="primary"
                    />
                }
                label={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {label}
                    </Typography>
                }
            />
            {description && (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 7, mt: -1 }}>
                    {description}
                </Typography>
            )}
        </Box>
    );
}