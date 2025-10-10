import { useToast } from "../contexts/ToastContext";
import { useExtracurricularService } from "./use-extracurricular-service";

export const useDeleteExtracurricularActivity = (refresh: () => void) => {
    const extracurricularService = useExtracurricularService();
    const { showSuccess } = useToast();

    const handleDelete = async (activityId: number) => {
        try {
            await extracurricularService.deleteActivity(activityId);
            showSuccess("Atividade excluída com sucesso!");
            refresh();

        } catch (error) {
            console.error("Error deleting activity:", error);
        }
    };

    return { handleDelete };
}