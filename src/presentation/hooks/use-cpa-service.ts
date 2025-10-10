import { CpaService } from "@/domain/services/cpa-service"
import AxiosSetup from "@/infra/http/axios-setup"

export const useCpaService = () => {
    return new CpaService(AxiosSetup().api);
}