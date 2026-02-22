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

    const isYearOnly = props.views?.length === 1 && props.views[0] === 'year';

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
                        value={value ? (isYearOnly && typeof value === 'number' ? dayjs().year(value) : dayjs(value)) : null}
                        onChange={(date) => {
                            if (!date) {
                                onChange(null);
                                return;
                            }

                            if (isYearOnly) {
                                onChange(date.year());
                            } else {
                                onChange(date.format("YYYY-MM-DD"));
                            }
                        }}
                        slotProps={{
                            field: {
                                clearable: true,
                                onClear: () => onChange(null),
                            },
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