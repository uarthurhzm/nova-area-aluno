import { LibraryService } from "@/domain/services/library-service"
import AxiosSetup from "@/infra/http/axios-setup"

export const useLibraryService = () => {
    return new LibraryService(AxiosSetup().api);
}