import { tagApiProvider } from "./../constants";

export const updateTagApi = (id: string, payload: any) => tagApiProvider.updateTag(id, payload);

