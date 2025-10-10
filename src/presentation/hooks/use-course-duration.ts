import { CourseService } from "@/domain/services/course-service";
import { useFetchData } from "./use-fetch-data";
import type { CourseResponseDTO } from "@/application/dto/course-duration-response-dto";

export const useCourseDuration = (courseId: number) => {
    const { data, loading } = useFetchData<CourseResponseDTO, CourseService>(
        {
            ServiceClass: CourseService,
            methodName: "getCourseDuration",
            params: [courseId]
        }
    );

    return { data: Array.isArray(data) ? data[0] : data, loading };
}