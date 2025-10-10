import type { PostCpaAnswerDTO } from "@/application/dto/post-cpa-answer-dto";
import { useCpaService } from "./use-cpa-service"
import { useToast } from "../contexts/ToastContext";

export const usePostCpaAnswer = () => {
    const cpaService = useCpaService();
    const { showSuccess } = useToast();

    const postAnswer = async (data: PostCpaAnswerDTO) => {
        try {
            await cpaService.postCpaAnswer(data);
            showSuccess("Resposta registrada com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar a resposta:", error);
        }
    }

    return { postAnswer };
}