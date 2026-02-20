import { authorApiProvider } from "../constants";
import type { CreateAuthorPayload } from "../types";

export const createAuthor = (payload: CreateAuthorPayload) => authorApiProvider.createAuthor(payload);