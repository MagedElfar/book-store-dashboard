import type { AnalyticsParams, SalesAnalytics, UserGrowthAnalytics, TopBooksAnalytics, CustomerTypeComparison, InventoryStatus, OrderStatusAnalytics } from "./analytics";

export interface AnalyticsApiProvider {
    getSalesData: (params: AnalyticsParams) => Promise<SalesAnalytics[]>;
    getUserGrowth: (params: AnalyticsParams) => Promise<UserGrowthAnalytics[]>;
    getTopSellingBooks: (params: AnalyticsParams & { limit?: number }) => Promise<TopBooksAnalytics[]>;
    getCustomerComparison: (params: AnalyticsParams) => Promise<CustomerTypeComparison[]>;
    getInventoryStatus: () => Promise<InventoryStatus[]>;
    getOrderStatusData: (params: AnalyticsParams) => Promise<OrderStatusAnalytics[]>
}