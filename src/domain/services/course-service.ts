import type { AxiosInstance } from "axios";
import { CourseRepository } from "../repositories/course-repository";
import type { CoursesResponseDTO } from "@/application/dto/courses-response-dto";
import type { CourseScheduleResponseDTO } from "@/application/dto/course-schedule-response-dto";
import type { OpportunityResponseDTO } from "@/application/dto/opportunity-response-dto";
import type { CourseResponseDTO } from "@/application/dto/course-duration-response-dto";

export class CourseService {
    private courseRepository: CourseRepository;

    constructor(api: AxiosInstance) {
        this.courseRepository = new CourseRepository(api);
    }

    async getAllCourses(): Promise<CoursesResponseDTO[]> {
        return await this.courseRepository.getAllCourses();
    }

    async getCourseSchedule(courseId: number): Promise<CourseScheduleResponseDTO[]> {
        return await this.courseRepository.getCourseSchedule(courseId);
    }

    async getCourseOpportunities(courseId: number): Promise<OpportunityResponseDTO[]> {
        return await this.courseRepository.getCourseOpportunities(courseId);
    }

    async getCourseDuration(courseId: number): Promise<CourseResponseDTO> {
        return await this.courseRepository.getCourseDuration(courseId);
    }


}