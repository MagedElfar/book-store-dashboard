import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Stack, Grid } from "@mui/material";
import dayjs from "dayjs";
import { forwardRef } from "react";

import { Logo } from "@/shared/components";
import type { SupportedLang } from "@/shared/types";
import { fDate, formatPrice } from "@/shared/utilities";

interface Props {
    order: any;
    lang?: SupportedLang;
}

export const OrderInvoice = forwardRef<HTMLDivElement, Props>(({ order, lang = "en" }, ref) => {
    const isAr = lang === 'ar';

    // نصوص الترجمة اليدوية لضمان ظهورها في الطباعة
    const content = {
        invoice: isAr ? "فاتورة" : "INVOICE",
        orderNo: isAr ? "رقم الطلب" : "Order No",
        billTo: isAr ? "فاتورة إلى:" : "Bill To:",
        shipTo: isAr ? "شحن إلى:" : "Ship To:",
        item: isAr ? "العنصر" : "Item",
        price: isAr ? "السعر" : "Price",
        qty: isAr ? "الكمية" : "Qty",
        total: isAr ? "الإجمالي" : "Total",
        subtotal: isAr ? "المجموع الفرعي:" : "Subtotal:",
        vat: isAr ? "الضريبة (14%):" : "VAT (14%):",
        shipping: isAr ? "الشحن:" : "Shipping:",
        grandTotal: isAr ? "الإجمالي الكلي:" : "Grand Total:",
        thanks: isAr ? "شكراً لتعاملكم معنا!" : "Thank you for your business!",
        footerNote: isAr ? "فاتورة إلكترونية صالحة بدون ختم" : "Electronic invoice valid without stamp"
    };

    return (
        <Box
            ref={ref}
            sx={{
                p: 5,
                bgcolor: 'white',
                color: 'black',
                direction: isAr ? 'rtl' : 'ltr',
                minHeight: '297mm', // A4 Height
            }}
        >
            {/* Header: Invoice Title | Logo | Store Info */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h3" fontWeight="bold" sx={{ color: 'primary.main', mb: 0.5 }}>
                        {content.invoice}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="600">
                        {content.orderNo} #{order.order_number}
                    </Typography>
                </Box>

                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Logo height={60} width={60} />
                </Box>

                <Box sx={{ flex: 1, textAlign: isAr ? 'left' : 'right' }}>
                    <Typography variant="h6" fontWeight="bold">My Bookstore</Typography>
                    <Typography variant="body2" color="text.secondary">support@bookstore.com</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {fDate(dayjs().toString())}
                    </Typography>
                </Box>
            </Stack>

            <Divider sx={{ mb: 5, borderStyle: 'dashed' }} />

            {/* Customer & Shipping Info */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid size={{ xs: 6 }}>
                    <Typography variant="overline" fontWeight="800" color="text.secondary" gutterBottom>
                        {content.billTo}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">{order.customer_name}</Typography>
                    <Typography variant="body2">{order.customer_email}</Typography>
                    <Typography variant="body2">{order.customer_phone}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Typography variant="overline" fontWeight="800" color="text.secondary" gutterBottom>
                        {content.shipTo}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.shipping_details?.street_address}
                    </Typography>
                    <Typography variant="body2">
                        {order.shipping_details?.city}, {order.shipping_details?.state}
                    </Typography>
                    <Typography variant="body2">
                        {order.shipping_details?.country}
                    </Typography>
                </Grid>
            </Grid>

            {/* Items Table */}
            <TableContainer sx={{ mb: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#F4F6F8' }}>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>{content.item}</TableCell>
                            <TableCell align="center" sx={{ color: 'black', fontWeight: 'bold' }}>{content.price}</TableCell>
                            <TableCell align="center" sx={{ color: 'black', fontWeight: 'bold' }}>{content.qty}</TableCell>
                            <TableCell align="right" sx={{ color: 'black', fontWeight: 'bold' }}>{content.total}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.items?.map((item: any) => (
                            <TableRow key={item.id} sx={{ borderBottom: '1px solid #EEE' }}>
                                <TableCell sx={{ color: 'black', py: 2 }}>
                                    {isAr ? (item.book?.title_ar || item.book?.title_en) : item.book?.title_en}
                                </TableCell>
                                <TableCell align="center" sx={{ color: 'black' }}>
                                    {formatPrice(item.price_at_purchase, lang)}
                                </TableCell>
                                <TableCell align="center" sx={{ color: 'black' }}>
                                    {item.quantity}
                                </TableCell>
                                <TableCell align="right" sx={{ color: 'black', fontWeight: '600' }}>
                                    {formatPrice(item.price_at_purchase * item.quantity, lang)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Calculations Summary */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Stack spacing={1.5} sx={{ width: '280px' }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">{content.subtotal}</Typography>
                        <Typography fontWeight="500">{formatPrice(order.subtotal_amount, lang)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">{content.vat}</Typography>
                        <Typography fontWeight="500">{formatPrice(order.vat_amount, lang)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">{content.shipping}</Typography>
                        <Typography fontWeight="500">{formatPrice(order.shipping_fees, lang)}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" fontWeight="bold">{content.grandTotal}</Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                            {formatPrice(order.total_amount, lang)}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            {/* Footer Note */}
            <Box sx={{ mt: 'auto', pt: 10, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 1 }}>{content.thanks}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {content.footerNote}
                </Typography>
            </Box>
        </Box>
    );
});

OrderInvoice.displayName = "OrderInvoice";