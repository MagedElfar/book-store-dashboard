import { authorApiProvider } from "../constants";
import type { UpdateAuthorPayload } from "../types";

export const updateAuthorApi = (id: string, payload: UpdateAuthorPayload) =>
    authorApiProvider.updateAuthor(id, payload);