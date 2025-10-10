export interface StudentActivitiesResponseDTO {
    CD_EMP: number
    COD_LANC: number
    CD_CSO: number
    CD_ALU: number
    CD_ATV: number
    DESCRICAO: string
    DATA_INI: string
    DATA_FIM: string
    CAR_HOR: number
    CAR_HORHOM: number | null
    OBS: string | null
    DATA_CURSO: string | null
    AUTORIZA: number
    ID_CURSO_EXT: number | null
    ARQUIVO: string
    DATA_INSERT: string
    NM_ATV: string
}