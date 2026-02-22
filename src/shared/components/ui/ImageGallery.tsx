// src/shared/components/ImageGallery.tsx

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Box, Card, Stack, styled, IconButton } from "@mui/material";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const Thumbnail = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active"
})<{ active?: boolean }>(({ theme, active }) => ({
    width: 70,
    height: 70,
    borderRadius: (Number(theme.shape.borderRadius) || 5) * 1.5,
    cursor: "pointer",
    overflow: "hidden",
    flexShrink: 0,
    border: `2px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
    transition: theme.transitions.create(["border-color", "transform"]),
    "&:hover": {
        transform: "scale(1.05)",
    },
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
}));

interface Props {
    mainImage: string;
    additionalImages?: { image_url: string }[];
    aspectRatio?: string;
}

export function ImageGallery({ mainImage, additionalImages = [], aspectRatio = "1/1" }: Props) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // تجميع كل الصور في مصفوفة واحدة
    const slides = [mainImage, ...additionalImages.map((img) => img.image_url)]
        .filter(Boolean)
        .map((src) => ({ src }));

    const currentImage = slides[index]?.src;

    return (
        <Box>
            <Card sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                bgcolor: 'background.neutral',
                aspectRatio: aspectRatio,
                maxHeight: 450,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: "auto"
            }}>
                <Box
                    component="img"
                    src={currentImage}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        mx: "auto"
                    }}
                />

                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        bottom: 8,
                        bgcolor: 'rgba(255,255,255,0.8)',
                        '&:hover': { bgcolor: 'white' }
                    }}
                >
                    <FullscreenIcon />
                </IconButton>
            </Card>

            {slides.length > 1 && (
                <Stack
                    direction="row"
                    spacing={1.5}
                    justifyContent="center"
                    sx={{
                        mt: 2,
                        overflowX: 'auto',
                        pb: 1,
                        '&::-webkit-scrollbar': { height: 6 },
                        '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 3 }
                    }}
                >
                    {slides.map((slide, idx) => (
                        <Thumbnail
                            key={idx}
                            active={index === idx}
                            onClick={() => setIndex(idx)}
                        >
                            <img src={slide.src} alt={`thumbnail-${idx}`} />
                        </Thumbnail>
                    ))}
                </Stack>
            )}

            <Lightbox
                index={index}
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                plugins={[Zoom]}
                on={{ view: ({ index: newIndex }) => setIndex(newIndex) }}
            />
        </Box>
    );
}