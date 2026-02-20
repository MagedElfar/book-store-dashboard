import { authorApiProvider } from "../constants";

export const deleteAuthorApi = (id: string) => authorApiProvider.deleteAuthor(id);
