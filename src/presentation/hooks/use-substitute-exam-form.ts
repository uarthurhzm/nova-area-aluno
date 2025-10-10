import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { SUBSTITUTE_EXAM_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";
import { useSecretaryService } from "./use-secretary-service";

export const useSubstituteExamForm = (documentsRefresh: () => void, disciplinesRefresh: () => void) => {
    const secretaryService = useSecretaryService();
    const { userData } = useAuth();
    const { showSuccess } = useToast();
    const { form, handleSubmit } = useFormSetup({
        schema: SUBSTITUTE_EXAM_SCHEMA,
        defaultValues: {
            disciplineId: "",
            phone: "",
            email: "",
        },
        onSubmit: async (data) => {
            if (!userData) return;
            try {
                await secretaryService.postSubstituteExamRequest({
                    cd_mat: userData.CD_MAT,
                    phone: data.phone,
                    email: data.email,
                    disciplineId: data.disciplineId,
                });
                showSuccess("Requerimento enviado com sucesso!");
                form.reset();
                documentsRefresh();
                disciplinesRefresh();
            } catch (error) {
                console.error(`Erro ao enviar requerimento: ${error}`);
            }
        }
    })

    return { form, handleSubmit };
}