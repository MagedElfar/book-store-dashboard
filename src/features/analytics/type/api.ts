import type { AnalyticsParams, SalesAnalytics, UserGrowthAnalytics, TopBooksAnalytics, CustomerTypeComparison, InventoryStatus } from "./analytics";

export interface AnalyticsApiProvider {
    getSalesData: (params: AnalyticsParams) => Promise<SalesAnalytics[]>;
    getUserGrowth: (params: AnalyticsParams) => Promise<UserGrowthAnalytics[]>;
    getTopSellingBooks: (params: AnalyticsParams & { limit?: number }) => Promise<TopBooksAnalytics[]>;
    getCustomerComparison: (params: AnalyticsParams) => Promise<CustomerTypeComparison[]>;
    getInventoryStatus: () => Promise<InventoryStatus[]>;
}