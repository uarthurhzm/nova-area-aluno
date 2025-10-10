import type { StudentDisciplinesContentResponseDTO } from "@/application/dto/student-disciplines-content-response";
import { formatDate } from "@/presentation/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StudentDisciplinesContentResponseDTO>[] = [
    {
        accessorKey: "DISCIPLINA",
        header: "Nome",
    },
    {
        accessorKey: "DATA",
        header: "Publicado",
        cell: ({ row }) => formatDate(row.original.DATA)
    },
]