export function errorMapper(error: any): string[] {

    if (error?.message) {
        return [error?.message]
    }

    return []
}