import type { AxiosInstance } from "axios";
import { NoticeRepository } from "../repositories/notice-repository";
import type { GetNoticesResponseDTO } from "@/application/dto/get-notices-response-dto";

export class NoticeService {
    private noticeRepository: NoticeRepository;

    constructor(api: AxiosInstance) {
        this.noticeRepository = new NoticeRepository(api);
    }

    async getNotices(cd_mat: number, cd_cso: number): Promise<GetNoticesResponseDTO[]> {
        return await this.noticeRepository.getNotices(cd_mat, cd_cso);
    }
}
