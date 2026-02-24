export type DialogState<T> =
    | { type: "create" }
    | { type: "edit"; data: T }
    | { type: "delete"; data: T }
    | { type: null };

export interface AutocompleteOptions<K = any> {
    label: string;
    value: string;
    image?: string | null;
    data: K;
}