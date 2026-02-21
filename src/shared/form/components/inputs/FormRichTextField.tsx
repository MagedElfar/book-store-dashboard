import { Box, Typography, FormHelperText, alpha } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export type FormRichTextFieldProps = {
    name: string;
    label?: string;
    placeholder?: string;
    height?: number | string;
};

export const FormRichTextField: React.FC<FormRichTextFieldProps> = ({
    name,
    label,
    placeholder,
    height = 200
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Box sx={{ mb: 2, width: '100%' }}>
                    {label && (
                        <Typography
                            variant="subtitle2"
                            sx={{ mb: 1, fontWeight: 600, color: fieldState.error ? 'error.main' : 'text.primary' }}
                        >
                            {label}
                        </Typography>
                    )}

                    <Box sx={{
                        '& .ql-toolbar': {
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            borderColor: fieldState.error ? 'error.main' : 'divider',
                            backgroundColor: (theme) => alpha(theme.palette.divider, 0.1),
                            '& .ql-stroke': {
                                stroke: (theme) => theme.palette.text.primary, // ألوان الأيقونات
                            },
                            '& .ql-fill': {
                                fill: (theme) => theme.palette.text.primary,
                            },
                            '& .ql-picker': {
                                color: (theme) => theme.palette.text.primary,
                            },
                            // FIX: Dropdown options menu (The list that opens)
                            '& .ql-picker-options': {
                                backgroundColor: (theme) => theme.palette.background.paper, // Dark background
                                color: (theme) => theme.palette.text.primary,
                                border: (theme) => `1px solid ${theme.palette.divider} !important`,
                                boxShadow: (theme) => theme.shadows[3],
                                borderRadius: '4px',
                                padding: '8px',
                            },
                        },
                        '& .ql-container': {
                            height: height,
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                            borderColor: fieldState.error ? 'error.main' : 'divider',
                            fontSize: '1rem',
                        },
                        '& .ql-editor.ql-blank::before': {
                            color: 'text.disabled',
                            fontStyle: 'normal'
                        }
                    }}>
                        <ReactQuill
                            theme="snow"
                            {...field}
                            value={field.value || ''}
                            onChange={(content) => field.onChange(content)}
                            placeholder={placeholder}
                        />
                    </Box>

                    {fieldState.error && (
                        <FormHelperText error sx={{ mt: 1, fontWeight: 500 }}>
                            {fieldState.error.message}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    );
};