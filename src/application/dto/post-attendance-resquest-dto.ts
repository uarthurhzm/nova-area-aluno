export interface PostAttendanceRequestDTO {
    cd_alu: number;
    cd_cso: number;
    anoval_mat: number;
    semval_mat: number;
    serie_mat: number;
    periodo_mat: number;
    sector: number;
    subject: number;
    requestType?: number;
    disciplineIds?: number[];
    documentId?: string;
    description: string;
    attachments?: File[];
}