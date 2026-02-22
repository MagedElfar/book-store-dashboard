import { bookApiProvider } from "../constants";

export const deleteBookApi = (id: string) => bookApiProvider.deleteBook(id);
