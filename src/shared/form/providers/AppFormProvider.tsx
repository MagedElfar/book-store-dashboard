import type { SxProps } from "@mui/material";
import { Box } from "@mui/material";
import type { UseFormReturn, FieldValues } from "react-hook-form";
import { FormProvider } from "react-hook-form";

export type FormProps<T extends FieldValues> = {
  onSubmit: (data: T) => void;
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  sx?: SxProps;
};

export function AppFormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  sx,
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        autoComplete="on"
        sx={sx}
      >
        {children}
      </Box>
    </FormProvider>
  );
}
