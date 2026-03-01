export interface Column<T> {
    id: (keyof T & string) | "actions" | "total" | (string & {});
    label: string;
    align?: "left" | "right" | "center";
    render?: (value: any, row: T) => React.ReactNode; // دالة اختيارية لتخصيص العرض
}