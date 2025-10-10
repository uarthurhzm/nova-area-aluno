import type { StudentActivitiesResponseDTO } from "@/application/dto/student-activities-response-dto";
import { formatDate } from "@/presentation/utils/format-date";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent } from "../../ui/tooltip";

// const extracurricularService = useExtracurricularService();

interface ColumnsProps {
    onDelete: (activityId: number) => Promise<void>;
}

export const createColumns = ({ onDelete }: ColumnsProps): ColumnDef<StudentActivitiesResponseDTO>[] => [
    {
        accessorKey: "DESCRICAO",
        header: "Atividade",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <a href={`https://apps.unilago.edu.br/aluno/pedagogico/download-file?path=certificado&filename=${activity.ARQUIVO}`} target="_blank">
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
    {
        accessorKey: "DATA_INI",
        header: "Início",
        cell: ({ row }) => formatDate(row.original.DATA_INI)

    },
    {
        accessorKey: "DATA_FIM",
        header: "Fim",
        cell: ({ row }) => formatDate(row.original.DATA_FIM)
    },
    {
        accessorKey: "CAR_HOR",
        header: "C/H",
    },
    {
        accessorKey: "CAR_HORHOM",
        header: "C/H.H",
    },
    {
        accessorKey: "DATA_INSERT",
        header: "Data",
        cell: ({ row }) => formatDate(row.original.DATA_INSERT.split(" ")[0])
    },
    {
        accessorKey: "",
        header: "Ação",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <Button
                    variant={"destructive"}
                    onClick={async () => {
                        try {
                            await onDelete(activity.COD_LANC);
                        } catch (error) {
                            console.error("Error deleting activity:", error);
                        }
                    }}>
                    <Trash2 />
                </Button>
            )
        },
    }
]