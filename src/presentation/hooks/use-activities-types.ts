import type { ActivitiesResponseDTO } from "@/application/dto/activities-response-dto";
import { ExtracurricularService } from "@/domain/services/extracurricular-service";
import { useFetchData } from "./use-fetch-data";

export const useActivitiesTypes = () => {
    const { data, loading } = useFetchData<ActivitiesResponseDTO, ExtracurricularService>(
        {
            ServiceClass: ExtracurricularService,
            methodName: "getActivities"
        }
    );

    return { data, loading };

}