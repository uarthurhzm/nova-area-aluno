import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { useSecretaryService } from "./use-secretary-service";

export const useDeleteSubstituteRequest = (documentsRefresh: () => void, disciplinesRefresh: () => void) => {
    const secretaryService = useSecretaryService();
    const { showSuccess } = useToast();
    const { userData } = useAuth();
    const handleDelete = async (num_prot: number) => {
        if (!userData) return
        try {
            await secretaryService.deleteSubstituteExamRequest({ num_prot, cd_mat: userData.CD_MAT });
            showSuccess("Requerimento deletado com sucesso");
            documentsRefresh();
            disciplinesRefresh();
        } catch (error) {
            console.error(error);
        }
    }

    return { handleDelete };
}