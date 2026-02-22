import type { GetManyResponse } from "@/shared/types";

import type { Book, BookStatistics } from "./book";
import type { BookParams, BookRequestPayload } from "./request";

export interface BookApiProvider {
    createBook: (payload: BookRequestPayload) => Promise<Book>,
    getBookById: (id: string) => Promise<Book>,
    updateBook: (id: string, payload: BookRequestPayload) => Promise<Book>,
    getBooks: (params: BookParams) => Promise<GetManyResponse<Book>>,
    getBooksStat: () => Promise<BookStatistics>
    deleteBook: (id: string) => Promise<void>;
}