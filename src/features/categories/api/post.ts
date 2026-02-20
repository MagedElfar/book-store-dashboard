import { categoryApiProvider } from "../constants";
import type { CreateCategoryPayload } from "../types";

export const createCategory = (payload: CreateCategoryPayload) => categoryApiProvider.createCategory(payload);