import type { StudentExtensionCertificateResponseDTO } from "@/application/dto/student-extension-certificate-response-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Button } from "../../ui/button";
import { Printer } from "lucide-react";

export const columns: ColumnDef<StudentExtensionCertificateResponseDTO>[] = [
    {
        accessorKey: "NOMECURSO",
        header: "Nome",
    },
    {
        accessorKey: "ID_INSCRICAO_EXT",
        header: "",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                window.open(`https://apps.unilago.edu.br/certificado/${activity.ID_INSCRICAO_EXT}`, '_blank', 'noopener,noreferrer');
                            }}
                        >
                            <Printer />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Download do certificado
                    </TooltipContent>
                </Tooltip>
            );
        }
    }
]