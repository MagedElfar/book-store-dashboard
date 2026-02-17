import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, IconButton, InputAdornment, type TextFieldProps } from "@mui/material";
import { useBoolean } from 'minimal-shared/hooks';
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export type FormPasswordFieldProps = TextFieldProps & {
    name: string;
};

export const FormPasswordField: React.FC<FormPasswordFieldProps> = ({ name, label, ...props }) => {
    const { control } = useFormContext();
    const showPassword = useBoolean();


    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...props}
                    type={showPassword.value ? 'text' : 'password'}
                    label={label}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={showPassword.onToggle} edge="end" size="small">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
};
