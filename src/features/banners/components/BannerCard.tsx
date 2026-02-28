// src/features/banners/components/BannerCard.tsx

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Stack,
    Chip,
    Tooltip,
    Switch,
    CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import type { SupportedLang } from '@/shared/types';

import { useUpdateBanner } from '../hooks';
import type { Banner } from '../types';

interface Props {
    banner: Banner;
    onEdit: (id: string) => void;
    onDelete: (banner: Banner) => void;
    isDirigible?: boolean
}

export function BannerCard({ banner, onEdit, onDelete, isDirigible }: Props) {
    const { t, i18n } = useTranslation(["banner", "common"]);
    const { mutate: updateBanner, isPending } = useUpdateBanner();
    const lang = i18n.language as SupportedLang

    const handleToggleActive = () => {
        updateBanner({
            id: banner.id,
            data: { is_active: !banner.is_active }
        }, {
            onSuccess: () => {
                toast.success(t("feedback.successUpdateBanner"));
            }
        });
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[10],
                },
                position: 'relative',
                opacity: banner.is_active ? 1 : 0.8,
                ...(isDirigible && {
                    cursor: 'grab',
                    '&:active': { cursor: 'grabbing' },
                })
            }}>
            <Box sx={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    image={banner.image_url}
                    alt={banner.title_en}
                    sx={{
                        height: '100%',
                        objectFit: 'cover',
                        filter: banner.is_active ? 'none' : 'grayscale(0.5)'
                    }}
                />

                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: `rgba(0,0,0,${banner.overlay_opacity / 100})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: banner.text_color,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: 1.2
                        }}
                    >
                        {banner?.[`title_${lang}`]}
                    </Typography>
                </Box>

                <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                    <Chip
                        icon={<StarIcon sx={{ fontSize: '1rem !important', color: '#FFD700' }} />}
                        label={`#${banner.priority}`}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            backdropFilter: 'blur(4px)',
                            fontWeight: 'bold'
                        }}
                    />
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 150 }}>
                            {banner?.[`title_${lang}`]}
                        </Typography>
                    </Box>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        {isPending ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : (
                            <Box onPointerDown={(e) => e.stopPropagation()}>
                                <Tooltip title={banner.is_active ? t("status.active") : t("status.inactive")}>
                                    <Switch
                                        size="small"
                                        checked={banner.is_active}
                                        onChange={handleToggleActive}
                                        color="success"
                                    />
                                </Tooltip>
                            </Box>

                        )}
                    </Stack>
                </Stack>

                <Typography variant="caption" color="text.disabled" display="block" noWrap>
                    {banner.link_url ? banner.link_url : t("common:noData")}
                </Typography>
            </CardContent>

            <Box sx={{ p: 1.5, pt: 0, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Tooltip title={t("common:actions.edit")}>
                    <IconButton
                        size="small"
                        onClick={() => onEdit(banner.id)}
                        sx={{ bgcolor: 'primary.lighter', color: 'primary.main', '&:hover': { bgcolor: 'primary.light' } }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t("common:actions.delete")}>
                    <IconButton
                        size="small"
                        onClick={() => onDelete(banner)}
                        sx={{ bgcolor: 'error.lighter', color: 'error.main', '&:hover': { bgcolor: 'error.light' } }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Card>
    );
}