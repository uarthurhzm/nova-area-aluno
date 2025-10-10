export type UserEntity = {
    CD_CSO: number;
    CD_ALU: number;
    CD_MAT: number;
    NM_ALU: string;
    NM_CSO: string;
    ANOVAL_MAT: number;
    SEMVAL_MAT: number;
    SERIE_MAT: number;
    PER_GDE: number;
    TIPO: string;
    CLASSE: string; // CHAR(1)
    ID_TIPO_DISCIPLINA: number;
    LOGIN: string;
    NUMPROT: string;
    CD_EMP: number;
    LIBERACAO_FIN: string; // CHAR(1)
    CD_GRADE_TURMA: number;
    SIT_ALUNO: number;
    CELULAR_VALIDO: number;
    CPF: string;
    EMAIL_ALU: string;
    IDBANCO: number;
    PER_GDE_FIN: number;
    QTDE_BOLSA: number;
    CONTRATO: number;
    TIPOCURSO: number;
    TIPO_ALUNO: number;
    FOTO_ALUNO: string; // BASE64
}