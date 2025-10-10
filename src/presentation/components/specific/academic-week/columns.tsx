import type { StudentAcademicWeekResponseDTO } from "@/application/dto/student-academic-week-response-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export const columns: ColumnDef<StudentAcademicWeekResponseDTO>[] = [
    {
        accessorKey: "NM_PLT",
        header: "Nome",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <a href={`https://apps.unilago.edu.br/certificado/semana-academica/${activity.COD}`} target="_blank" rel="noopener noreferrer">
                            {activity.NM_PLT}
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