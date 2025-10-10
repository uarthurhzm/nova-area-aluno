import type { IesProfessorsResponseDTO } from "@/application/dto/ies-professors-response-dto";
import { useFetchData } from "./use-fetch-data";
import { ProfessorService } from "@/domain/services/professor-service";

export const useIESProfessors = () => {
    const { data, loading, error } = useFetchData<IesProfessorsResponseDTO, ProfessorService>(
        {
            ServiceClass: ProfessorService,
            methodName: "getAllIesProfessors",
        }
    );

    return {
        data,
        loading,
        error
    };
}