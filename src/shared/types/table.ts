export interface Column<T> {
    id: keyof T | "actions" | "total";
    label: string;
    align?: "left" | "right" | "center";
    render?: (value: any, row: T) => React.ReactNode; // دالة اختيارية لتخصيص العرض
}