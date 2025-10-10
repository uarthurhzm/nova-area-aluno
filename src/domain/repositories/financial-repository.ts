import type { TaxesResponseDTO } from "@/application/dto/taxes-response-dto";
import type { AxiosInstance } from "axios";

export class FinancialRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getTaxes(): Promise<TaxesResponseDTO[]> {
        const response = await this.api.get<TaxesResponseDTO[]>('/financial/taxes');
        return response.data;
    }
}