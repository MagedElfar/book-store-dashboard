import { TextField, InputAdornment, Box } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import type { FormTextFieldProps } from "./FormTextField";

export const FormColorField: React.FC<FormTextFieldProps> = ({ name, label, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...props}
                    label={label}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    placeholder="#FFFFFF"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Box
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '4px',
                                            backgroundColor: field.value || '#6b7280',
                                            border: '1px solid #ccc',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <input
                                            type="color"
                                            value={field.value || '#6b7280'}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            style={{
                                                position: 'absolute',
                                                top: -5,
                                                left: -5,
                                                width: '150%',
                                                height: '150%',
                                                cursor: 'pointer',
                                                opacity: 0
                                            }}
                                        />
                                    </Box>
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            )}
        />
    );
};