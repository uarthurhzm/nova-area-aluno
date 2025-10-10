import { CampusService } from "@/domain/services/campus-service";
import { useFetchData } from "./use-fetch-data";
import type { CampusEntity } from "@/domain/entities/campus-entity";

export const useCampus = () => {
    const { data, loading } = useFetchData<CampusEntity, CampusService>(
        {
            ServiceClass: CampusService,
            methodName: "getAllCampuses"
        }
    );

    return { data, loading };
}