import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import type { BannerFormSchemaType } from '../schema';

interface Props {
    data: Partial<BannerFormSchemaType>;
    language?: 'ar' | 'en';
}

export function BannerPreview({ data, language = 'en' }: Props) {
    const { t } = useTranslation("banner");

    const getAlignment = () => {
        const vertical = {
            top: 'flex-start',
            middle: 'center',
            bottom: 'flex-end',
        }[data.vertical_pos || 'middle'];

        const horizontal = {
            start: 'flex-start',
            center: 'center',
            end: 'flex-end',
        }[data.horizontal_pos || 'center'];

        const textAlign = {
            start: 'left',
            center: 'center',
            end: 'right',
        }[data.horizontal_pos || 'center'];

        return { vertical, horizontal, textAlign };
    };

    const align = getAlignment();

    return (
        <Box sx={{ width: '100%', position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
                ✨ {t("livePreview")}
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    aspectRatio: { xs: '4/3', md: '21/9' }, // شكل البانر الحقيقي
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: '#f0f0f0',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                {data.image_url ? (
                    <Box
                        component="img"
                        src={data.image_url}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            transition: 'all 0.5s ease',
                        }}
                    />
                ) : (
                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.disabled' }}>
                        {t("label.imageUrl")}...
                    </Box>
                )}

                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        transition: 'background-color 0.3s ease',
                        bgcolor: `rgba(0,0,0,${(data.overlay_opacity || 0) / 100})`,
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        p: { xs: 3, md: 6 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: align.vertical,
                        alignItems: align.horizontal,
                        textAlign: align.textAlign,
                        zIndex: 2,
                    }}
                >
                    <Box sx={{ maxWidth: '80%' }}>
                        <Typography
                            sx={{
                                color: data.text_color,
                                fontWeight: 900,
                                fontSize: { xs: '1.5rem', md: '2.5rem' },
                                lineHeight: 1.1,
                                mb: 1,
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            }}
                        >
                            {language === 'ar' ? data.title_ar : data.title_en || "Book Store Title"}
                        </Typography>

                        {(data.description_ar || data.description_en) && (
                            <Typography
                                sx={{
                                    color: data.text_color,
                                    opacity: 0.9,
                                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                                    mb: 3,
                                    fontWeight: 500,
                                }}
                            >
                                {language === 'ar' ? data.description_ar : data.description_en}
                            </Typography>
                        )}

                        {(data.button_text_ar || data.button_text_en) && (
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '50px',
                                    bgcolor: data.btn_bg_color,
                                    color: data.btn_color,
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                    textTransform: 'none',
                                }}
                            >
                                {language === 'ar' ? data.button_text_ar : data.button_text_en}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <Typography
                variant="caption"
                sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary', fontStyle: 'italic' }}
            >
                * {t("helper.previewInfo")}
            </Typography>
        </Box>
    );
}