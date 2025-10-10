import type { MessageDTO } from "@/application/dto/sent-message-dto";
import { COMMENTS_MESSAGE_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";
import { useAuth } from "../contexts/AuthContext";
import { useMessageService } from "./use-message-service";
import { useToast } from "../contexts/ToastContext";

export const useCommentsForm = (message: MessageDTO, refresh: () => void) => {
    const messageService = useMessageService();
    const { userData } = useAuth();
    const { showSuccess } = useToast();

    const form = useFormSetup({
        schema: COMMENTS_MESSAGE_SCHEMA,
        defaultValues: {
            comment: "",
        },
        onSubmit: async (data) => {
            try {
                await messageService.postComment(
                    {
                        ...data,
                        messageId: message.COD_MENSAGEM,
                        recipientId: message.COD_DESTINATARIO,
                        senderId: userData!.CD_MAT
                    });
                showSuccess("Comentário enviado com sucesso!");
                form.form.reset();
                refresh();

            } catch (error) {
                console.error("Erro ao enviar comentário:", error);
            }
        }
    });

    return form;
}