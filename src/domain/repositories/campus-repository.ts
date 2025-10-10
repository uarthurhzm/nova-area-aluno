import type { AxiosInstance } from "axios";
import type { CampusEntity } from "../entities/campus-entity";

export class CampusRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getAllCampuses(): Promise<CampusEntity[]> {
        const response = await this.api.get("/campuses");
        return response.data;
    }

}