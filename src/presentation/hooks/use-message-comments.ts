import type { CommentsResponseDTO } from "@/application/dto/comments-response-dto";
import { MessageService } from "@/domain/services/message-service";
import { useFetchData } from "./use-fetch-data";
import { useRefreshData } from "./use-refresh-data";

export const useMessageComments = (messageId: number) => {

    const { refresh, refreshKey } = useRefreshData();
    const { data, loading } = useFetchData<CommentsResponseDTO, MessageService>(
        {
            ServiceClass: MessageService,
            methodName: "getMessageComments",
            params: [messageId, refreshKey],
        }
    );

    return { data, loading, refresh };
}