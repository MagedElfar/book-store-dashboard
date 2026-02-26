export interface SalesAnalytics {
    period_date: string;
    total_revenue: number;
    orders_count: number;
    registered_revenue: number;
    guest_revenue: number;
}

export interface UserGrowthAnalytics {
    reg_date: string;
    new_users_count: number;
}

export interface TopBooksAnalytics {
    book_id: string;
    book_title: string;
    units_sold: number;
    revenue: number;
}

export interface CustomerTypeComparison {
    customer_type: 'Registered' | 'Guest';
    total_spent: number;
    total_orders: number;
}

export interface InventoryStatus {
    status_label: string;
    books_count: number;
}

export interface AnalyticsParams {
    startDate?: string | null;
    endDate?: string | null;
}