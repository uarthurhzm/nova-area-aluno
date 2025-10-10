import type { LoginDTO } from "@/application/dto/login-dto";
import { useAuth } from "@/presentation/contexts/AuthContext";
import type { UserEntity } from "../entities/user-entity";
import { LoginRepository } from "../repositories/login-repository";
import type { RecoveryPasswordResponseDTO } from "@/application/dto/recovery-password-response-dto";

export class LoginService {

    private loginRepository: LoginRepository;
    private setUserData: (data: UserEntity | null) => void;
    private setToken: (token: string | null) => void;

    constructor() {
        this.loginRepository = new LoginRepository();
        this.setUserData = useAuth().setUserData;
        this.setToken = useAuth().setToken;
    }

    async login(credentials: LoginDTO): Promise<void> {
        const { user, token } = await this.loginRepository.login(credentials);
        this.setUserData(user);
        this.setToken(token);
    }

    async logout(): Promise<void> {
        await this.loginRepository.logout();
        this.setUserData(null);
        this.setToken(null);
    }

    async refreshToken(): Promise<void> {
        const { token, user } = await this.loginRepository.refreshToken();
        this.setToken(token);
        this.setUserData(user);
    }

    async recoveryPassword(cpf: string, type: 'A' | 'P'): Promise<RecoveryPasswordResponseDTO> {
        return await this.loginRepository.recoveryPassword(cpf, type);
    }
}