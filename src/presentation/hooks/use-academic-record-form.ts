import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { ACADEMIC_RECORD_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";
import { useSecretaryService } from "./use-secretary-service";

export const useAcademicRecordForm = (onPost: () => void) => {
    const secretaryService = useSecretaryService();
    const { userData } = useAuth();
    const { showSuccess } = useToast();
    const { form, handleSubmit } = useFormSetup({
        schema: ACADEMIC_RECORD_SCHEMA,
        defaultValues: {
            phone: "",
            email: "",
        },
        onSubmit: async (data) => {
            if (!userData) return;
            try {
                await secretaryService.postAcademicRecordRequest({
                    ...data,
                    anoval_mat: userData.ANOVAL_MAT,
                    cd_alu: userData.CD_ALU,
                    cd_cso: userData.CD_CSO,
                    cd_emp: userData.CD_EMP,
                    period_mat: userData.PER_GDE,
                    serie_mat: userData.SERIE_MAT,
                    semval_mat: userData.SEMVAL_MAT,
                });
                showSuccess("Requerimento enviado com sucesso!");
                onPost();
                form.reset();
            } catch (error) {
                console.error("Erro ao enviar o requerimento:", error);
            }
        }
    })

    return { form, handleSubmit }
}