import type { StudentActivitiesResponseDTO } from "@/application/dto/student-activities-response-dto";
import { ExtracurricularService } from "@/domain/services/extracurricular-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";
import { useRefreshData } from "./use-refresh-data";

export const useStudentActivities = () => {
    const { userData } = useAuth();
    const { refreshKey, refresh } = useRefreshData();
    const { data, loading } = useFetchData<StudentActivitiesResponseDTO, ExtracurricularService>(
        {
            ServiceClass: ExtracurricularService,
            methodName: "getByStudent",
            params: [userData?.CD_ALU, userData?.CD_CSO, refreshKey],
        }
    );

    return { data, loading, refresh };
}