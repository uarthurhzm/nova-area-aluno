import type { IesProfessorsResponseDTO } from "@/application/dto/ies-professors-response-dto";
import type { AxiosInstance } from "axios";

export class ProfessorRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getAllIesProfessors(): Promise<IesProfessorsResponseDTO[]> {
        const response = await this.api.get<IesProfessorsResponseDTO[]>(`/professors/ies`);
        return response.data;
    }
}