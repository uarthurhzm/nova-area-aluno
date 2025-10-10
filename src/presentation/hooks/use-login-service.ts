import { LoginService } from "@/domain/services/login-service";

export const useLoginService = () => {
    return new LoginService();
}