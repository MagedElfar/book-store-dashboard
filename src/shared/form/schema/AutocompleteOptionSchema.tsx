import { z } from "zod";

export const AutocompleteOptionSchema = z.
    object({
        label: z.string(),
        value: z.string(),
    });

