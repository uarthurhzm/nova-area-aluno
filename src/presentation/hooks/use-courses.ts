import { CourseService } from "@/domain/services/course-service";
import { useFetchData } from "./use-fetch-data";
import type { CoursesResponseDTO } from "@/application/dto/courses-response-dto";

export const useCourses = () => {
    const { data, loading } = useFetchData<CoursesResponseDTO, CourseService>({
        ServiceClass: CourseService,
        methodName: "getAllCourses",
    });

    return { data, loading };
}