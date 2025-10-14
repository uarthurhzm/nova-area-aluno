import type { EventsResponseDTO } from "@/application/dto/events-response-dto";
import { formatDate } from "@/presentation/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<EventsResponseDTO>[] = [
    {
        accessorKey: "TITULO",
        header: "Nome",
    },
    {
        accessorKey: "NM_SALA",
        header: "Local",
    },
    {
        accessorKey: "DATA",
        header: "Início",
        cell: ({ row }) => formatDate(row.original.DATA.split(" ")[0])

    },
    {
        accessorKey: "DATA_FIM",
        header: "Fim",
        cell: ({ row }) => formatDate(row.original.DATA_FIM.split(" ")[0])
    },
    {
        accessorKey: "TURNO",
        header: "Turno",
        cell: ({ row }) => {
            return (
                row.original.TURNO === 1 ? 'Manhã' :
                    row.original.TURNO === 2 ? 'Tarde' :
                        row.original.TURNO === 3 ? 'Noite' : 'Todos'
            )
        }
    }
]