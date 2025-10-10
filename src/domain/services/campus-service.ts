import type { AxiosInstance } from "axios";
import { CampusRepository } from "../repositories/campus-repository";
import type { CampusEntity } from "../entities/campus-entity";

export class CampusService {
    private campusRepository: CampusRepository;

    constructor(api: AxiosInstance) {
        this.campusRepository = new CampusRepository(api);
    }

    async getAllCampuses(): Promise<CampusEntity[]> {
        return await this.campusRepository.getAllCampuses();
    }

}