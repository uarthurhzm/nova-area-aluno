import { useFormSetup } from "./use-form-setup";

import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { NEW_MESSAGE_SCHEMA } from "../schemas/schemas";
import { useMessageService } from "./use-message-service";

export const useMessageForm = () => {
    const { userData } = useAuth();
    const { showSuccess } = useToast();
    const messageService = useMessageService();

    const { form, handleSubmit } = useFormSetup({
        schema: NEW_MESSAGE_SCHEMA,
        defaultValues: {
            professorId: "",
            subject: "",
            message: "",
        },
        onSubmit: async (data) => {
            try {
                await messageService.postMessage({
                    ...data,
                    studentId: userData!.CD_MAT
                });
                showSuccess("Mensagem enviada com sucesso!");
                form.reset();
            } catch (error) {
                console.error("Erro ao enviar mensagem:", error);
            }
        }
    });

    return { form, handleSubmit };
};