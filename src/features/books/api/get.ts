import { bookApiProvider } from "../constants";

export const getBooByIdApi = (id: string) => bookApiProvider.getBookById(id)