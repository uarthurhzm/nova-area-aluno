import type { CourseScheduleResponseDTO } from "@/application/dto/course-schedule-response-dto";
import { useFetchData } from "./use-fetch-data";
import { CourseService } from "@/domain/services/course-service";
import { useAuth } from "../contexts/AuthContext";

export const useCourseSchedule = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<CourseScheduleResponseDTO, CourseService>({
        ServiceClass: CourseService,
        methodName: "getCourseSchedule",
        params: [userData?.CD_CSO],
    });

    return { data, loading };
}