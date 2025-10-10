import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { EXTRACURRICULAR_ACTIVITY_SCHEMA } from "../schemas/schemas";
import { useExtracurricularService } from "./use-extracurricular-service";
import { useFormSetup } from "./use-form-setup";

export const useActivityForm = (refresh: () => void) => {
    const { userData } = useAuth();
    const { showSuccess } = useToast();
    const extracurricularService = useExtracurricularService();

    const form = useFormSetup({
        schema: EXTRACURRICULAR_ACTIVITY_SCHEMA,
        defaultValues: {
            activityId: "",
            description: "",
            startDate: "",
            endDate: "",
            hours: '0',
            pdf: null,
        },
        onSubmit: async (data) => {
            if (!userData) return;

            try {
                await extracurricularService.postActivity({
                    ...data,
                    activityId: Number(data.activityId),
                    hours: Number(data.hours),
                    cd_alu: userData.CD_ALU,
                    cd_cso: userData.CD_CSO,
                    cd_emp: userData.CD_EMP,
                });

                showSuccess("Cadastro realizado com sucesso!");
                form.form.reset();
                refresh();
            } catch (error) {
                console.error(`Erro ao cadastrar atividade: ${error}`);
            }
        }
    })

    return form;
}