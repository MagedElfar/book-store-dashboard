import { TextField, type TextFieldProps } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export type FormTextFieldProps = TextFieldProps & {
    name: string; // اسم الحقل في الفورم
};
export const FormTextField: React.FC<FormTextFieldProps> = ({ name, label, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...props}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    label={label}
                />
            )}
        />
    );
};
