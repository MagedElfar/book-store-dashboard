import { Grid } from "@mui/material";

import { StatCard, type StatItem } from "./StatCard";

interface StatsBoardProps {
    items: StatItem[];
    columns?: { xs: number; sm: number; md: number };
}

export function StatsBoard({ items, columns = { xs: 12, sm: 6, md: 3 } }: StatsBoardProps) {
    return (
        <Grid container spacing={3}>
            {items.map((item, index) => (
                <Grid key={index} size={{ xs: columns.xs, sm: columns.sm, md: columns.md }}>
                    <StatCard item={item} />
                </Grid>
            ))}
        </Grid>
    );
}

