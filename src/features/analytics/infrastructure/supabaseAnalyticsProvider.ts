import { supabaseClient } from '@/shared/lib';

import type { AnalyticsApiProvider } from './../type/api';

export const supabaseAnalyticsProvider: AnalyticsApiProvider = {
    getSalesData: async (params) => {
        const { data, error } = await supabaseClient.rpc('get_analytics_sales', {
            p_start_date: params.startDate,
            p_end_date: params.endDate
        });

        if (error) throw new Error(`Sales Analytics Error: ${error.message}`);
        return data;
    },

    // 2.(User Growth)
    getUserGrowth: async (params) => {
        const { data, error } = await supabaseClient.rpc('get_analytics_users', {
            p_start_date: params.startDate,
            p_end_date: params.endDate
        });

        if (error) throw new Error(`User Growth Error: ${error.message}`);
        return data;
    },

    // 3.Top books
    getTopSellingBooks: async (params) => {
        const { data, error } = await supabaseClient.rpc('get_analytics_top_books', {
            p_start_date: params.startDate,
            p_end_date: params.endDate,
            p_limit: params.limit || 10
        });

        if (error) throw new Error(`Top Books Error: ${error.message}`);
        return data;
    },

    // 4.(Registered vs Guest)
    getCustomerComparison: async (params) => {
        const { data, error } = await supabaseClient.rpc('get_analytics_customer_comparison', {
            p_start_date: params.startDate,
            p_end_date: params.endDate
        });

        if (error) throw new Error(`Customer Comparison Error: ${error.message}`);
        return data;
    },

    // 5.(Inventory Health)
    getInventoryStatus: async () => {
        const { data, error } = await supabaseClient.rpc('get_analytics_inventory_status');

        if (error) throw new Error(`Inventory Status Error: ${error.message}`);
        return data;
    }
};