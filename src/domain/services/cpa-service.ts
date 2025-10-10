import type { AxiosInstance } from "axios";
import { CpaRepository } from "../repositories/cpa-repository";
import type { PostCpaAnswerDTO } from "@/application/dto/post-cpa-answer-dto";

export class CpaService {
    private cpaRepository: CpaRepository;

    constructor(api: AxiosInstance) {
        this.cpaRepository = new CpaRepository(api);
    }

    async getStudentQuestions(cd_mat: number) {
        return await this.cpaRepository.getStudentQuestions(cd_mat);
    }

    async postCpaAnswer(data: PostCpaAnswerDTO): Promise<void> {
        await this.cpaRepository.postCpaAnswer(data);
    }

    async checkCpa(cd_mat: number): Promise<[{ answered: 'S' | 'N' }]> {
        return await this.cpaRepository.checkCpa(cd_mat);
    }

}