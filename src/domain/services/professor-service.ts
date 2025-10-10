import type { AxiosInstance } from "axios";
import { ProfessorRepository } from "../repositories/professor-repository";
import type { IesProfessorsResponseDTO } from "@/application/dto/ies-professors-response-dto";

export class ProfessorService {
    private professorRepository: ProfessorRepository;

    constructor(api: AxiosInstance) {
        this.professorRepository = new ProfessorRepository(api);
    }

    async getAllIesProfessors(): Promise<IesProfessorsResponseDTO[]> {
        return await this.professorRepository.getAllIesProfessors();
    }
}