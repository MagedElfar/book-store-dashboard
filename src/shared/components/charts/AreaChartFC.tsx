import { useTheme } from '@mui/material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface AreaChartFCProps {
  data: any[];
  xKey?: string;
  yKey?: string;
}

export function AreaChartFC({ data, xKey = "date", yKey = "sales" }: AreaChartFCProps) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 10 }} // زيادة الـ bottom لإعطاء مساحة للتواريخ
      >
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
            <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />

        <XAxis
          dataKey={xKey}
          axisLine={false}
          tickLine={false}
          tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
          dy={10} // تحريك التواريخ للأسفل قليلاً بعيداً عن الخط
          tickMargin={10} // مسافة إضافية
          minTickGap={20} // يمنع تداخل التواريخ إذا كانت كثيرة
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
          dx={-10} // تحريك أرقام الـ Y لليسار قليلاً بعيداً عن أول نقطة في الرسم
          tickMargin={10}
        />

        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: 'none',
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.background.paper
          }}
        />

        <Area
          type="monotone"
          dataKey={yKey}
          stroke={theme.palette.primary.main}
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorSales)"
          // إضافة الـ ConnectNulls لضمان عدم انقطاع الخط إذا كانت هناك أيام بدون بيانات
          connectNulls
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}