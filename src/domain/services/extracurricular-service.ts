import type { AxiosInstance } from "axios";
import { ExtracurricularRepository } from "../repositories/extracurricular-repository";
import type { ActivitiesResponseDTO } from "@/application/dto/activities-response-dto";
import type { PostActivityDTO } from "@/application/dto/post-activity-dto";

export class ExtracurricularService {
    private extracurricularRepository: ExtracurricularRepository;

    constructor(api: AxiosInstance) {
        this.extracurricularRepository = new ExtracurricularRepository(api);
    }

    async getActivities(): Promise<ActivitiesResponseDTO[]> {
        return await this.extracurricularRepository.getActivities();
    }

    async postActivity(data: PostActivityDTO): Promise<void> {
        const formData = new FormData();
        formData.append('cd_alu', data.cd_alu.toString());
        formData.append('cd_cso', data.cd_cso.toString());
        formData.append('cd_emp', data.cd_emp.toString());
        formData.append('activityId', data.activityId.toString());
        formData.append('description', data.description);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        formData.append('hours', data.hours.toString());
        formData.append('pdf', data.pdf);
        return await this.extracurricularRepository.postActivity(formData as unknown as PostActivityDTO);
    }

    async getByStudent(cd_alu: number, cd_cso: number) {
        return await this.extracurricularRepository.getByStudent(cd_alu, cd_cso);
    }

    async deleteActivity(activityId: number): Promise<void> {
        return await this.extracurricularRepository.deleteActivity(activityId);
    }
}