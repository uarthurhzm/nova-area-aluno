import { MessageService } from "@/domain/services/message-service";
import AxiosSetup from "@/infra/http/axios-setup";

export const useMessageService = () => {
    return new MessageService(AxiosSetup().api);
}