import { Stack } from "@mui/material";
import type React from "react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Stack spacing={{ md: 3, xs: 2 }}>
            {children}
        </Stack>
    )
}
