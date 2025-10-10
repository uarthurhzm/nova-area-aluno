import { SecretaryService } from "@/domain/services/secretary-service";
import AxiosSetup from "@/infra/http/axios-setup";

export const useSecretaryService = () => {
    return new SecretaryService(AxiosSetup().api);
}