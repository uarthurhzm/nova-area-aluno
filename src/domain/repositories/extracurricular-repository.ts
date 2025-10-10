import type { ActivitiesResponseDTO } from "@/application/dto/activities-response-dto";
import type { PostActivityDTO } from "@/application/dto/post-activity-dto";
import type { StudentActivitiesResponseDTO } from "@/application/dto/student-activities-response-dto";
import type { AxiosInstance } from "axios";

export class ExtracurricularRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getActivities(): Promise<ActivitiesResponseDTO[]> {
        const response = await this.api.get<ActivitiesResponseDTO[]>('/extracurricular/activities');
        return response.data;
    }

    async postActivity(data: PostActivityDTO): Promise<void> {
        await this.api.post('/extracurricular/activities', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async getByStudent(cd_alu: number, cd_cso: number): Promise<StudentActivitiesResponseDTO[]> {
        const response = await this.api.get<StudentActivitiesResponseDTO[]>(`/extracurricular/${cd_alu}/activities`, {
            params: { cd_cso }
        });
        return response.data;
    }

    async deleteActivity(activityId: number): Promise<void> {
        await this.api.delete(`/extracurricular/activities/${activityId}`);
    }
}