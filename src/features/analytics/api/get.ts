import { apiProvider } from "../constants";
import type { AnalyticsParams } from "../type";

export const getSalesDataApi = (params: AnalyticsParams) =>
    apiProvider.getSalesData(params);

export const getUserGrowthApi = (params: AnalyticsParams) =>
    apiProvider.getUserGrowth(params);

export const getTopSellingBooksApi = (params: AnalyticsParams & { limit?: number }) =>
    apiProvider.getTopSellingBooks(params);

export const getCustomerComparisonApi = (params: AnalyticsParams) =>
    apiProvider.getCustomerComparison(params);

export const getInventoryStatusApi = () =>
    apiProvider.getInventoryStatus();