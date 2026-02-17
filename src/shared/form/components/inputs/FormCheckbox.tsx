import {
    Checkbox,
    FormControlLabel,
    FormHelperText,
    FormControl,
    type CheckboxProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export type FormCheckboxProps = CheckboxProps & {
    name: string;
    label: string;
};

export function FormCheckbox({
    name,
    label,
    ...props
}: FormCheckboxProps) {

    const { control } = useFormContext();

    return (
        <FormControl error={false}>
            <Controller
                name={name}
                control={control}
                defaultValue={false}
                render={({ field, fieldState }) => (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...field}
                                    {...props}
                                    checked={!!field.value}
                                />
                            }
                            label={label}
                        />

                        {fieldState.error && (
                            <FormHelperText>
                                {fieldState.error.message}
                            </FormHelperText>
                        )}
                    </>
                )}
            />
        </FormControl>
    );
}
