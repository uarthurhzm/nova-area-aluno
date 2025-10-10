import type { CourseScheduleResponseDTO } from "@/application/dto/course-schedule-response-dto";
import { formatDate } from "@/presentation/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CourseScheduleResponseDTO>[] = [
    {
        accessorKey: "NM_CSO",
        header: "Título",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <a
                    href={`https://apps.unilago.edu.br/aluno/pedagogico/download-file-for-ano?path=horario-avaliacao&year=${activity.DATA ? new Date(activity.DATA).getFullYear() : activity.ANO}&filename=${activity.LINK}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {activity.NOMEARQUIVO}
                </a>

            );
        },
    },
    {
        accessorKey: "DATA",
        header: "Publicação",
        cell: ({ row }) => formatDate(row.original.DATA)

    },
]