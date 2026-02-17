import {
    MuiTelInput,
    type MuiTelInputProps,
} from "mui-tel-input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export type FormPhoneInputProps = MuiTelInputProps & {
    name: string;
};

export const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
    name,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <MuiTelInput
                    {...field}
                    {...props}

                    defaultCountry="EG"
                    forceCallingCode
                    onlyCountries={["EG", "SA", "AE", "US"]}
                    onChange={(value) => {
                        // تنظيف نهائي قبل التخزين
                        const cleanValue = value.replace(/\s+/g, "");
                        field.onChange(cleanValue);
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                />
            )}
        />
    );
};
