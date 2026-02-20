import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export type FormDatePickerProps = Omit<DatePickerProps, "value" | "onChange"> & {
    name: string;
    label: string;
};

export const FormDatePicker: React.FC<FormDatePickerProps> = ({ name, label, ...props }) => {
    const { control } = useFormContext();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ...field }, fieldState }) => (
                    <DatePicker
                        {...field}
                        {...props}
                        label={label}
                        value={value ? dayjs(value) : null}
                        onChange={(date) => {
                            onChange(date ? date.toISOString() : null);
                        }}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: !!fieldState.error,
                                helperText: fieldState.error?.message,
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
};