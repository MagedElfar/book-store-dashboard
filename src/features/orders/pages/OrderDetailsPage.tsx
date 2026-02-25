import EditIcon from '@mui/icons-material/Edit';
import { Button, Chip, Grid, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { usePermission } from '@/features/auth';
import { DataHandler, PageTitle, PageWrapper } from '@/shared/components';
import { useDialog } from '@/shared/hooks';

import { EditOrderFormDialog, OrderAdditionalInfo, OrderCustomerInfo, OrderDetailsSkeleton, OrderItemsTable, OrderStatusActions } from '../components';
import { OrderSummaryCard } from '../components/ui';
import { ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG } from '../config';
import { useGetOrderById } from '../hooks';
import type { Order, OrderStatus, PaymentStatus } from '../types';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(["order", "common"]);

  const { data: order, isLoading, isError, refetch } = useGetOrderById(id!);
  const { data: orderData, isEdit, openEdit, closeDialog } = useDialog<Order>();
  const { hasPermission } = usePermission()

  return (
    <PageWrapper>
      <PageTitle
        withBackArrow
        title={t("order:orderDetails", {
          orderNumber: order?.order_number ? `#${order.order_number}` : ""
        })}
        actions={
          <>
            {order && <Chip
              label={`${t("order:fields.status")}: ${t(`status.${order?.status}` as any)}`}
              size="small"
              color={ORDER_STATUS_CONFIG[order?.status as OrderStatus]?.color}
              sx={{ fontWeight: 'bold', height: 20 }}
            />}
            {order && <Chip
              label={`${t("order:fields.payment")}: ${t(`payments.${order?.payment_status}` as any)}`}
              size="small"
              color={PAYMENT_STATUS_CONFIG[order?.payment_status as PaymentStatus]?.color}
              sx={{ fontWeight: 'bold', height: 20 }}
            />}
            {order && hasPermission("order.manage") && <Button
              color="warning"
              onClick={() => openEdit(order)}
              size="small"
              startIcon={<EditIcon fontSize="small" />}
            >
              {t("common:actions.edit")}
            </Button>}
          </>
        }
      />

      <DataHandler
        isLoading={isLoading}
        isError={isError}
        data={order}
        onRetry={refetch}
        loadingComponent={<OrderDetailsSkeleton />}
      >
        {(orderData) => (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                <OrderCustomerInfo order={orderData} />
                <OrderAdditionalInfo order={orderData} />
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={2}>
                <OrderStatusActions
                  orderId={orderData.id}
                  currentStatus={orderData.status}
                  currentPaymentStatus={orderData.payment_status}
                />

                <OrderSummaryCard
                  subtotal={order?.subtotal_amount ?? 0}
                  shippingCost={order?.shipping_fees ?? 0}
                  vatCost={order?.vat_amount ?? 0}
                  finalTotal={order?.total_amount ?? 0}
                  variant="elevation"
                />
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <OrderItemsTable status={orderData.status} orderId={orderData.id} items={order?.items || []} />
            </Grid>
          </Grid>
        )}
      </DataHandler>

      {orderData && <EditOrderFormDialog
        open={isEdit}
        onClose={closeDialog}
        order={orderData}
      />}
    </PageWrapper>
  )
}