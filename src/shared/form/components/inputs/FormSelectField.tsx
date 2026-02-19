import { TextField, MenuItem, type TextFieldProps } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export type FormSelectFieldProps = TextFieldProps & {
    name: string; // اسم الحقل في الفورم
    options: { label: string; value: string }[]; // options for select
};

export const FormSelectField: React.FC<FormSelectFieldProps> = ({ name, label, options, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...props}
                    select
                    fullWidth
                    label={label}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                >
                    {options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};
