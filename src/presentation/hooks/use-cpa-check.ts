import { CpaService } from "@/domain/services/cpa-service";
import { useFetchData } from "./use-fetch-data";

export const useCpaCheck = (cd_mat: number) => {
    const { data, loading } = useFetchData<{ answered: 'S' | 'N' }, CpaService>(
        {
            ServiceClass: CpaService,
            methodName: "checkCpa",
            params: [cd_mat]
        }
    );

    return { data: Array.isArray(data) ? data[0] : data, loading };
}