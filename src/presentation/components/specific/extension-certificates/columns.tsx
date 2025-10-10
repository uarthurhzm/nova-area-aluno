import type { StudentExtensionCertificateResponseDTO } from "@/application/dto/student-extension-certificate-response-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export const columns: ColumnDef<StudentExtensionCertificateResponseDTO>[] = [
    {
        accessorKey: "NOMECURSO",
        header: "Nome",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <a href={`https://apps.unilago.edu.br/certificado/${activity.ID_INSCRICAO_EXT}`} target="_blank" rel="noopener noreferrer">
                            {activity.NOMECURSO}
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