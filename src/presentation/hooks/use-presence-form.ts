import type { StudentDisciplinesResponseDTO } from "@/application/dto/student-disciplines-response-dto";
import { useAuth } from "../contexts/AuthContext";
import { PRESENCE_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";
import { usePostPresence } from "./use-post-presence";
import { getCurrentLocation } from "../utils/get-current-location";

export const usePresenceForm = (confirmType: "in" | "out", disciplines: StudentDisciplinesResponseDTO[]) => {
    const { post } = usePostPresence();
    const { userData } = useAuth();
    const { latitude, longitude } = getCurrentLocation();

    const { form, handleSubmit } = useFormSetup({
        schema: PRESENCE_SCHEMA,
        defaultValues: {
            unitId: "",
            disciplineId: "",
            date: new Date().toISOString().split('T')[0],
        },
        onSubmit: async (data) => {
            const discipline = disciplines.find(d => d.ID_DISC.toString() === data.disciplineId.toString());
            const type = confirmType === "in" ? 1 : 2;
            const year = discipline!.ANO;
            const semester = discipline!.SEMESTRE;

            await post({
                cd_mat: userData!.CD_MAT,
                latitude,
                longitude,
                id_qrcode: null,
                year,
                semester,
                unitId: Number(data.unitId),
                disciplineId: Number(data.disciplineId),
                date: data.date,
                type
            });

        }
    });

    return { form, handleSubmit };
}