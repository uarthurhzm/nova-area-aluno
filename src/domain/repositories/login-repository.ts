import type { LoginDTO } from "@/application/dto/login-dto";
import type { LoginResponseDTO } from "@/application/dto/login-response-dto";
import type { RecoveryPasswordResponseDTO } from "@/application/dto/recovery-password-response-dto";
import type { RefreshTokenResponseDTO } from "@/application/dto/refresh-token-response-dto";
import AxiosSetup from "@/infra/http/axios-setup";

export class LoginRepository {

    private api;

    constructor() {
        this.api = AxiosSetup().api;
    }

    async login(credentials: LoginDTO): Promise<LoginResponseDTO> {
        const response = await this.api.post<LoginResponseDTO>("/auth/login", credentials);
        return response.data;
    }

    async logout(): Promise<void> {
        await this.api.post("/auth/logout");
    }

    async refreshToken(): Promise<RefreshTokenResponseDTO> {
        const response = await this.api.post<RefreshTokenResponseDTO>("/auth/refresh-token");
        return response.data;
    }

    async recoveryPassword(cpf: string, type: 'A' | 'P'): Promise<RecoveryPasswordResponseDTO> {
        const response = await this.api.post(`/auth/${cpf}/recovery-password`, { type });
        return response.data;
    }
}