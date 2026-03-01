import { Grid } from '@mui/material'

import { useLocalize } from '@/shared/lib'
import { DropzoneField } from '@/shared/media'

export function MediaStep() {
    const { t } = useLocalize("book")

    return <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12 }}>
            <DropzoneField
                name="cover_image"
                label={t("label.coverImage")}
                maxSize={3 * 1024 * 1024}
                accept={{
                    "image/jpeg": [".jpeg", ".jpg"],
                    "image/png": [".png"],
                    "image/webp": [".webp"]
                }}
            />
        </Grid>

        <Grid size={{ xs: 12 }}>
            <DropzoneField
                name="images"
                multiple
                label={t("label.gallery")}
                maxSize={3 * 1024 * 1024}
                accept={{
                    "image/jpeg": [".jpeg", ".jpg"],
                    "image/png": [".png"],
                    "image/webp": [".webp"]
                }}
            />
        </Grid>
    </Grid>
}
