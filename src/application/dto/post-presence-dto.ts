export interface PostPresenceDTO {
    cd_mat: number;
    latitude: number;
    longitude: number;
    id_qrcode?: string | null;
    year?: number | null;
    semester?: number | null;
    unitId?: number | null;
    disciplineId?: number | null;
    date?: string | null;
    type?: number | null;
}