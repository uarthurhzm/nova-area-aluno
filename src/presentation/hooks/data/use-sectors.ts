import type { GetAllSectorsResponseDTO } from "@/application/dto/get-all-sectors-response-dto";
import { SecretaryService } from "@/domain/services/secretary-service";
import { useFetchData } from "../use-fetch-data";

export const useSectors = () => {
    const { data, loading } = useFetchData<GetAllSectorsResponseDTO, SecretaryService>(
        {
            ServiceClass: SecretaryService,
            methodName: "getAllSectors"
        }
    );

    return { data, loading };
}