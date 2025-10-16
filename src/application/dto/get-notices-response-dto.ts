export interface GetNoticesResponseDTO {
    RECADO: string;
    DATA: string;
    PRIORIDADE: '1' | '2' | '3';
    TITULO: string;
    URL_DOC: string;
    USUARIO: string;
}