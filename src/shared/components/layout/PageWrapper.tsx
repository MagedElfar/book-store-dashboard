import { Stack } from "@mui/material";
import type React from "react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Stack height="100%" spacing={{ md: 3, xs: 2 }}>
            {children}
        </Stack>
    )
}
