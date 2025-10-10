import { DOCUMENT_TYPES } from "@/shared/constants/document-type";
import { ENROLLMENT_CERTIFICATE_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";
import { useSecretaryService } from "./use-secretary-service";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";

export const useEnrollmentCertificateForm = (onPost: () => void) => {
    const secretaryService = useSecretaryService();
    const { userData } = useAuth()
    const { showSuccess } = useToast();
    return useFormSetup({
        schema: ENROLLMENT_CERTIFICATE_SCHEMA,
        defaultValues: {
            phone: "",
            email: "",
            documentType: DOCUMENT_TYPES[0].id
        },
        onSubmit: async (data) => {
            if (!userData) return;
            try {
                await secretaryService.postEnrollmentCertificateRequest({
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
            } catch (error) {
                console.error("Erro ao enviar o requerimento:", error);
            }
        }
    });
}