import { TextField, MenuItem, Box, type TextFieldProps } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormCountrySelectProps = TextFieldProps & {
    name: string;
};

export const FormCountrySelect: React.FC<FormCountrySelectProps> = ({ name, label, ...props }) => {
    const { control } = useFormContext();
    const { t } = useTranslation("order");

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
                    label={label || t("fields.country")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{
                        select: {
                            renderValue: (value) => {
                                const country = COUNTRIES.find(c => c.value === (value as string));
                                return (country ? country.label : (value as string)) as React.ReactNode;
                            }
                        }
                    }}
                >
                    {COUNTRIES.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            <Box component="span" sx={{ mr: 1.5, fontSize: '1.2rem' }}>
                                {opt.label.split(' ')[0]} {/* العلم */}
                            </Box>
                            {opt.label.split(' ').slice(1).join(' ')} {/* اسم الدولة */}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};


const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const COUNTRIES = [
    { label: "Egypt", value: "EG" },
    { label: "Saudi Arabia", value: "SA" },
    { label: "United Arab Emirates", value: "AE" },
    { label: "Kuwait", value: "KW" },
    { label: "Qatar", value: "QA" },
    { label: "Jordan", value: "JO" },
].map(c => ({
    value: c.value,
    label: `${getFlagEmoji(c.value)} ${c.label}`
}));