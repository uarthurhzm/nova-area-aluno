import type { PostPresenceDTO } from "@/application/dto/post-presence-dto";
import { useToast } from "../contexts/ToastContext";
import { useStudentService } from "./use-student-service";

export const usePostPresence = () => {
    const studentService = useStudentService();
    const { showSuccess } = useToast();

    const post = async (data: PostPresenceDTO) => {
        try {
            const response = await studentService.postPresence({
                ...data,
                unitId: data.unitId ? Number(data.unitId) : null,
                disciplineId: Number(data.disciplineId),
                type: data.type ?? 1, // presença
                date: data.date ?? new Date().toISOString().split('T')[0]
            });
            showSuccess(response.message);
        } catch (error) {
            console.error("Erro ao registrar presença:", error);
        }
    }

    return { post };
}