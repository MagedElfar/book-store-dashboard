import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
    type RadioGroupProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export type RadioOption = {
    label: string;
    value: string | number;
};

export type FormRadioGroupProps = RadioGroupProps & {
    name: string;
    label?: string;
    options: RadioOption[];
};

export function FormRadioGroup({
    name,
    label,
    options,
    ...props
}: FormRadioGroupProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} component="fieldset">
                    {label && (
                        <FormLabel component="legend" sx={{ mb: 1, typography: 'subtitle2' }}>
                            {label}
                        </FormLabel>
                    )}

                    <RadioGroup
                        {...field}
                        {...props}
                        value={field.value ?? ""}
                    >
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>

                    {fieldState.error && (
                        <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}