export type DialogState<T> =
    | { type: "create" }
    | { type: "edit"; data: T }
    | { type: "delete"; data: T }
    | { type: null };

export interface AutocompleteOptions {
    label: string
    value: string
    image?: string
}