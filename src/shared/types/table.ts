export interface Column<T> {
    id: keyof T | "actions"; // اسم الحقل في البيانات أو حقل خاص للأزرار
    label: string;
    align?: "left" | "right" | "center";
    render?: (value: any, row: T) => React.ReactNode; // دالة اختيارية لتخصيص العرض
}