import { useTheme } from '@mui/material';
import {
    Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';


export function PieChartFC({ data }: { data: any[] }) {
    const theme = useTheme();
    const COLORS = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.info.main];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
};