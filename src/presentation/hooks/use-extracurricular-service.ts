import { ExtracurricularService } from "@/domain/services/extracurricular-service";
import AxiosSetup from "@/infra/http/axios-setup";

export const useExtracurricularService = () => {
    return new ExtracurricularService(AxiosSetup().api);
}