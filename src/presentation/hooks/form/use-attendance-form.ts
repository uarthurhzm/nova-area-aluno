import { useToast } from "@/presentation/contexts/ToastContext";
import { ATTENDANCE_REQUEST_SCHEMA } from "../../schemas/schemas";
import { useFormSetup } from "../use-form-setup";
import { useSecretaryService } from "../use-secretary-service";
import type { PostAttendanceRequestDTO } from "@/application/dto/post-attendance-resquest-dto";
import { useAuth } from "@/presentation/contexts/AuthContext";

export const useAttendanceForm = () => {
    const { userData } = useAuth();
    const _secretaryService = useSecretaryService();
    const { showSuccess } = useToast();
    const { form, handleSubmit } = useFormSetup({
        schema: ATTENDANCE_REQUEST_SCHEMA,
        defaultValues: {
            sector: "",
            subject: "",
            requestType: "",
            disciplineIds: [],
            documentId: "",
            description: "",
        },
        onSubmit: async (data) => {
            try {
                await _secretaryService.postAttendanceRequest({
                    cd_alu: userData!.CD_ALU,
                    cd_cso: userData!.CD_CSO,
                    anoval_mat: userData!.ANOVAL_MAT,
                    semval_mat: userData!.SEMVAL_MAT,
                    serie_mat: userData!.SERIE_MAT,
                    periodo_mat: userData!.PER_GDE,
                    ...data
                } as unknown as PostAttendanceRequestDTO);
                showSuccess("Requerimento enviado com sucesso!");
                // form.reset();
            } catch (error) {
                console.error(error);
            }
        }
    });

    return {
        form,
        handleSubmit
    }
}