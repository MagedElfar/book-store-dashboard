// src/features/banners/types/index.ts

export type VerticalPos = 'top' | 'middle' | 'bottom';
export type HorizontalPos = 'start' | 'center' | 'end';

export interface Banner {
    id: string;
    title_ar: string;
    title_en: string;
    description_ar: string | null;
    description_en: string | null;
    button_text_ar: string | null;
    button_text_en: string | null;

    image_url: string;
    link_url: string | null;

    vertical_pos: VerticalPos;
    horizontal_pos: HorizontalPos;

    text_color: string;
    btn_color: string;
    btn_bg_color: string
    overlay_opacity: number;

    priority: number;
    is_active: boolean;
}