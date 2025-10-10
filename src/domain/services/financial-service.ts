import type { AxiosInstance } from "axios";
import { FinancialRepository } from "../repositories/financial-repository";
import type { TaxesResponseDTO } from "@/application/dto/taxes-response-dto";

export class FinancialService {
    private financialRepository: FinancialRepository;

    constructor(api: AxiosInstance) {
        this.financialRepository = new FinancialRepository(api);
    }

    async getTaxes(): Promise<TaxesResponseDTO[]> {
        return await this.financialRepository.getTaxes();
    }
}
