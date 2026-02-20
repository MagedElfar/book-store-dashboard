export interface UserAddress {
    id: string;
    user_id: string;
    full_name: string | null;
    phone: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    street_address: string | null;
    postal_code: string | null;
    lat: number | null;
    lng: number | null;
    is_default: boolean;
    created_at?: string;
}
