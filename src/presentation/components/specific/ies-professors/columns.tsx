import type { IesProfessorsResponseDTO } from "@/application/dto/ies-professors-response-dto";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IesProfessorsResponseDTO>[] = [
    {
        accessorKey: "NOME",
        header: "Nome",
    },
    {
        accessorKey: "DESCRICAO",
        header: "Descrição",
    },
    {
        accessorKey: "ANO",
        header: "Ano",
    },
]