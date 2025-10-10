import type { TaxesResponseDTO } from "@/application/dto/taxes-response-dto";
import { FinancialService } from "@/domain/services/financial-service";
import { useFetchData } from "./use-fetch-data";

export const useTaxes = () => {
    const { data, loading } = useFetchData<TaxesResponseDTO, FinancialService>({
        ServiceClass: FinancialService,
        methodName: "getTaxes"
    });

    return { data, loading }
}