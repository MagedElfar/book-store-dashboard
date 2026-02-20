import { tagApiProvider } from "./../constants";

export const getTagsApi = (params: any) => tagApiProvider.getTags(params);
export const getTagsStatsApi = () => tagApiProvider.getTagsStats();