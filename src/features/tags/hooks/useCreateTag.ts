import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTagApi } from "../api";
import { TAG_QUERY_KEY } from "../constants";
import type { CreateTagPayload } from "../types";

export function useCreateTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTagPayload) => createTagApi(data),
        onSuccess: () => {
            // تحديث الكاش لضمان ظهور التاج الجديد في الجدول والإحصائيات
            queryClient.invalidateQueries({
                queryKey: [TAG_QUERY_KEY]
            });
        }
    });
}