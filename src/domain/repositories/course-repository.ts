import type { CourseResponseDTO } from "@/application/dto/course-duration-response-dto";
import type { CourseScheduleResponseDTO } from "@/application/dto/course-schedule-response-dto";
import type { CoursesResponseDTO } from "@/application/dto/courses-response-dto";
import type { OpportunityResponseDTO } from "@/application/dto/opportunity-response-dto";
import type { AxiosInstance } from "axios";

export class CourseRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getAllCourses(): Promise<CoursesResponseDTO[]> {
        const response = await this.api.get(`/courses`);
        return response.data;
    }

    async getCourseSchedule(courseId: number): Promise<CourseScheduleResponseDTO[]> {
        const response = await this.api.get<CourseScheduleResponseDTO[]>(`/courses/${courseId}/schedule`);
        return response.data;
    }

    async getCourseOpportunities(courseId: number): Promise<OpportunityResponseDTO[]> {
        const response = await this.api.get<OpportunityResponseDTO[]>(`/courses/${courseId}/opportunities`);
        return response.data;
    }

    async getCourseDuration(courseId: number): Promise<CourseResponseDTO> {
        const response = await this.api.get<CourseResponseDTO>(`/courses/${courseId}/duration`);
        return response.data;
    }
}