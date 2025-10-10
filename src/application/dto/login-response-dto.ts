import type { UserEntity } from "@/domain/entities/user-entity";

export interface LoginResponseDTO {
    token: string;
    user: UserEntity
};
