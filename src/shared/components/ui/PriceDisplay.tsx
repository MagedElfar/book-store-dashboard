import { Stack, Typography } from '@mui/material';

import { useLocalize } from '@/shared/lib';
import { formatPrice } from '@/shared/utilities'

interface Props {
    sale_price?: number | null,
    price: number
}

export function PriceDisplay({ sale_price, price }: Props) {
    const { lang } = useLocalize();

    return <Stack spacing={0.3}>
        {sale_price ? (
            <>
                <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "text.disabled" }}
                >
                    {formatPrice(price, lang)}
                </Typography>

                <Typography variant="subtitle2" color="error.main">
                    {formatPrice(sale_price, lang)}
                </Typography>
            </>
        ) : (
            <Typography variant="subtitle2">
                {formatPrice(price, lang)}
            </Typography>
        )}
    </Stack>
}
