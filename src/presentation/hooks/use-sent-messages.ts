import type { MessageDTO } from "@/application/dto/sent-message-dto";
import { useFetchData } from "./use-fetch-data";
import { MessageService } from "@/domain/services/message-service";
import { useAuth } from "../contexts/AuthContext";

export const useSentMessages = (context: 'sent' | 'received') => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<MessageDTO, MessageService>(
        {
            ServiceClass: MessageService,
            methodName: "getMessages",
            params: [userData!.CD_MAT, context]
        }
    );

    return { data, loading };
}