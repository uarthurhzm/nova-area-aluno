import type { TaxesResponseDTO } from "@/application/dto/taxes-response-dto";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TaxesResponseDTO>[] = [
    {
        accessorKey: "DESCRICAO",
        header: "Nome",
    },
    {
        accessorKey: "VALOR",
        header: "Valor",
        cell: ({ row }) => row.original.VALOR.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
]