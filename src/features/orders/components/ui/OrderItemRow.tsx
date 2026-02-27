import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, Stack, Avatar, Box, Typography, IconButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from 'react-i18next';

import type { Book } from '@/features/books';
import { PriceDisplay } from '@/shared/components';
import { FormTextField } from "@/shared/form";
import type { SupportedLang } from '@/shared/types';
import { formatPrice } from '@/shared/utilities';

import type { CreateOrderFormSchemaType } from '../../schema';


export default function OrderItemRow({ index, onRemove }: { index: number; onRemove: () => void }) {
    const { watch } = useFormContext<CreateOrderFormSchemaType>();

    const { t, i18n } = useTranslation(["order", "book"])

    const lang = i18n.language as SupportedLang

    const bookItem = watch(`items.${index}`)
    const book = bookItem.item.data as Book

    const quantity = bookItem.quantity as number;
    const price = bookItem.price as number;
    const name = book?.[`title_${lang}`];
    const image = book.cover_image || "";

    const availableStock = book.stock || 0;

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 1.5,
                borderRadius: 2,
                minWidth: { xs: "600px", md: "0" },
                borderColor: quantity > availableStock ? 'error.main' : 'divider',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                    src={image}
                    alt={book.title_en}
                    variant="rounded"
                    sx={{ width: 45, height: 45, bgcolor: "background.neutral" }}
                >
                    {book.title_en?.[0]}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="bold">{name}</Typography>
                    <PriceDisplay
                        sale_price={book.sale_price}
                        price={book.price}
                    />
                    <Typography variant="caption" color={availableStock > 0 ? "text.secondary" : "error"}>
                        {t("book:label.stock")}: {availableStock}
                    </Typography>
                </Box>

                <Box sx={{ width: 80 }}>
                    <FormTextField
                        name={`items.${index}.quantity`}
                        type="number"
                        size="small"
                        slotProps={{ htmlInput: { min: 1, max: availableStock } }}
                        disabled={availableStock === 0}
                        error={quantity > availableStock}
                    />
                </Box>

                <Box sx={{ width: 100, textAlign: 'end' }}>
                    <Typography variant="subtitle2" color="primary">
                        {formatPrice(price * quantity, lang)}
                    </Typography>
                </Box>

                <IconButton onClick={onRemove} color="error" size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        </Paper>
    );
}