import { bookApiProvider } from "../constants";
import type { BookRequestPayload } from "../types";

export const createBookApi = (data: BookRequestPayload) => bookApiProvider.createBook(data)