import type { CpaStudentQuestionsResponseDTO } from "@/application/dto/cpa-student-questions-response-dto";
import type { PostCpaAnswerDTO } from "@/application/dto/post-cpa-answer-dto";
import type { AxiosInstance } from "axios";

export class CpaRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getStudentQuestions(cd_mat: number): Promise<CpaStudentQuestionsResponseDTO[]> {
        const response = await this.api.get(`/cpa/${cd_mat.toString().trim()}/institution/questions`);
        return response.data;
    }

    async postCpaAnswer(data: PostCpaAnswerDTO): Promise<void> {
        await this.api.post('/cpa/answer', data);
    }

    async checkCpa(cd_mat: number): Promise<[{ answered: 'S' | 'N' }]> {
        const response = await this.api.get(`/cpa/${cd_mat.toString().trim()}/check`);
        return response.data;
    }
}