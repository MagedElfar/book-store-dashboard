import type { GetManyResponse } from "@/shared/types";

import type { CreateTagPayload, TagsParams, UpdateTagPayload } from "./request";
import type { Tag, TagStatistics } from "./tag";


export interface TagApiProvider {
    createTag: (payload: CreateTagPayload) => Promise<Tag>;
    updateTag: (id: string, payload: UpdateTagPayload) => Promise<Tag>;
    getTags: (params: TagsParams) => Promise<GetManyResponse<Tag>>;
    deleteTag: (id: string) => Promise<void>;
    getTagsStats: () => Promise<TagStatistics>;
}