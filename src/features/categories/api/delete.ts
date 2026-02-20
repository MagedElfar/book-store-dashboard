import { categoryApiProvider } from "../constants";

export const deleteCategoryApi = (id: string) => categoryApiProvider.deleteCategory(id);