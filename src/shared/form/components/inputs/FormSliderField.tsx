import { Slider, type SliderProps, Typography, Box, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface Props extends SliderProps {
    name: string;
    label?: string;
    helperText?: string;
}

export function FormSliderField({ name, label, helperText, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Box sx={{ width: '100%', px: 1 }}>
                    {label && (
                        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                            {label} ({field.value}%)
                        </Typography>
                    )}

                    <Slider
                        {...field}
                        value={Number(field.value) || 0}
                        onChange={(_, value) => field.onChange(value)}
                        valueLabelDisplay="auto"
                        {...other}
                    />

                    {(error || helperText) && (
                        <FormHelperText error={!!error}>
                            {error ? error.message : helperText}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    );
}