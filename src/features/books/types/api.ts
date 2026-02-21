import type { Book } from "./book";
import type { BookRequestPayload } from "./request";

export interface BookApiProvider {
    createBook: (payload: BookRequestPayload) => Promise<Book>,
    getBookById: (id: string) => Promise<Book>,
    updateBook: (id: string, payload: BookRequestPayload) => Promise<Book>,
}