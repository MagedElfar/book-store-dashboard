import { useTheme } from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

interface BarChartFCProps {
    data: any[];
    xKey?: string;
    yKey?: string;
}

export function BarChartFC({ data, xKey = "name", yKey = "value" }: BarChartFCProps) {
    const theme = useTheme();

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                barSize={40}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />

                <XAxis
                    dataKey={xKey}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                    dy={10}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                    dx={-10}
                />

                <Tooltip
                    cursor={{ fill: theme.palette.action.hover }}
                    contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: theme.shadows[3],
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary
                    }}
                    itemStyle={{ color: theme.palette.text.primary }}
                    labelStyle={{ color: theme.palette.text.secondary, fontWeight: 'bold', marginBottom: '4px' }}
                />

                <Bar
                    dataKey={yKey}
                    radius={[6, 6, 0, 0]}
                >
                    {data.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}