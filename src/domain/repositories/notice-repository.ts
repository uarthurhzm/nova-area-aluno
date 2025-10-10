import type { GetNoticesResponseDTO } from "@/application/dto/get-notices-response-dto";
import type { AxiosInstance } from "axios";

export class NoticeRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getNotices(cd_mat: number, cd_cso: number): Promise<GetNoticesResponseDTO[]> {
        const response = await this.api.get<GetNoticesResponseDTO[]>(`/notices`, {
            params: {
                cd_mat,
                cd_cso
            }
        });
        return response.data;
    }
}