import { bookApiProvider } from "../constants";
import type { BookParams } from "../types";

export const getBooByIdApi = (id: string) => bookApiProvider.getBookById(id)

export const getBooKsApi = (params: BookParams) => bookApiProvider.getBooks(params)

export const getBooKsStateApi = () => bookApiProvider.getBooksStat() 