import type { OpportunityResponseDTO } from "@/application/dto/opportunity-response-dto";
import { CourseService } from "@/domain/services/course-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";

export const useCourseOpportunities = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<OpportunityResponseDTO, CourseService>({
        ServiceClass: CourseService,
        methodName: "getCourseOpportunities",
        params: [userData?.CD_CSO],
    });

    return { data, loading };
}