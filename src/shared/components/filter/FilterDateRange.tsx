import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
    startDate: string | null;
    endDate: string | null;
    onDateChange: (start: string | null, end: string | null) => void;
    labels?: { start: string; end: string };
}

export function FilterDateRange({ startDate, endDate, onDateChange, labels }: Props) {
    const startValue = startDate ? dayjs(startDate) : null;
    const endValue = endDate ? dayjs(endDate) : null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2}>
                {/* Start Date */}
                <DatePicker
                    label={labels?.start || "Start Date"}
                    value={startValue}
                    onChange={(newValue: Dayjs | null) => {
                        const dateStr = newValue ? newValue.toISOString() : null;
                        const newEnd = endValue && newValue && newValue.isAfter(endValue) ? null : endDate;
                        onDateChange(dateStr, newEnd);
                    }}
                    slotProps={{ textField: { size: 'small', sx: { minWidth: 150 } } }}
                />

                <DatePicker
                    label={labels?.end || "End Date"}
                    value={endValue}
                    minDate={startValue || undefined}
                    onChange={(newValue: Dayjs | null) => {
                        onDateChange(startDate, newValue ? newValue.toISOString() : null);
                    }}
                    slotProps={{
                        textField: {
                            size: 'small',
                            sx: { minWidth: 150 },
                            error: !!(startValue && endValue && endValue.isBefore(startValue))
                        }
                    }}
                />
            </Stack>
        </LocalizationProvider>
    );
}