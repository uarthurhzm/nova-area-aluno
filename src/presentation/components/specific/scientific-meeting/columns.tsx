import type { StudentListenerMeetingResponseDTO } from "@/application/dto/student-listener-meeting-response-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export const columns: ColumnDef<StudentListenerMeetingResponseDTO>[] = [
    {
        accessorKey: "TITULO",
        header: "Nome",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <a href={`https://apps.unilago.edu.br/certificado/${activity.ID_ENC_CIENT_AUT}`} target="_blank" rel="noopener noreferrer">
                            {activity.DESCRICAO}
                        </a>
                    </TooltipTrigger>
                    <TooltipContent>
                        Download do certificado
                    </TooltipContent>
                </Tooltip>
            );
        },
    },
]