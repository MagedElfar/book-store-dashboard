import { bookApiProvider } from "../constants";
import type { BookRequestPayload } from "../types";

export const updateBookApi = (id: string, payload: BookRequestPayload) =>
    bookApiProvider.updateBook(id, payload);