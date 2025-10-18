import type { GetProtocolTypesBySectorResponseDTO } from "@/application/dto/get-protocol-types-by-sector-response-dto";
import { SecretaryService } from "@/domain/services/secretary-service";
import { useFetchData } from "../use-fetch-data";
import { useRefreshData } from "../use-refresh-data";

export const useProtocolTypes = (cd_set: number) => {
    const { refresh, refreshKey } = useRefreshData();
    const { data, loading } = useFetchData<GetProtocolTypesBySectorResponseDTO, SecretaryService>(
        {
            ServiceClass: SecretaryService,
            methodName: "getProtocolTypesBySector",
            params: [cd_set, refreshKey]
        }
    );

    return { data, loading, refresh };
}
