export interface GetNoticesResponseDTO {
    RECADO: string;
    DATA: string;
    PRIORIDADE: 'Alta' | 'Media' | 'Baixa';
    TITULO: string;
    URL_DOC: string;
    USUARIO: string;
}