import { categoryApiProvider } from "../constants";
import type { UpdateCategoryPayload } from "../types";

export const updateCategoryApi = (id: string, payload: UpdateCategoryPayload) =>
    categoryApiProvider.updateCategory(id, payload);