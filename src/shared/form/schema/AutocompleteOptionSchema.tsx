import { z } from "zod";

export const AutocompleteOptionSchema = z.object({
    label: z.string(),
    value: z.string(),
    image: z.string().nullish(),
    data: z.any(),
});