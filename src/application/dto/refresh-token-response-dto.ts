import type { UserEntity } from "@/domain/entities/user-entity";

export interface RefreshTokenResponseDTO {
    token: string;
    user: UserEntity;
}