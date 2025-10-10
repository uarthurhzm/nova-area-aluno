import type { StudentGradesResponseDTO } from "@/application/dto/student-grades-response-dto";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent } from "../../ui/tooltip";

export const columns: ColumnDef<StudentGradesResponseDTO>[] = [
    {
        accessorKey: "NM_DISC",
        header: "Disciplina",
        cell: ({ row }) => {
            const grade = row.original;
            return (
                <Tooltip>
                    <TooltipTrigger>{`${grade.ID_DISC} - ${grade.NM_DISC}`}</TooltipTrigger>
                    <TooltipContent>
                        {grade.DESCRICAO}
                    </TooltipContent>
                </Tooltip>
            );
        },
    },
    {
        accessorKey: "BIM1",
        header: "1º B",
        cell: ({ getValue }) => getValue() ?? "0.0",
    },
    {
        accessorKey: "BIM2",
        header: "2º B",
        cell: ({ getValue }) => getValue() ?? "0.0",
    },
    {
        accessorKey: "BIM3",
        header: "3º B",
        cell: ({ getValue }) => getValue() ?? "0.0",
    },
    {
        accessorKey: "BIM4",
        header: "4º B",
        cell: ({ getValue }) => getValue() ?? "0.0",
    },
    {
        accessorKey: "MED_BIM",
        header: "M.B.",
        cell: ({ getValue }) => getValue() ?? "0.0",
    },
    {
        accessorKey: "EXAME",
        header: "Exame",
        cell: ({ getValue }) => getValue() ?? "0.0",
    },
    {
        accessorKey: "MED_FINAL",
        header: "M.F.",
        cell: ({ getValue }) => getValue() ?? "0.0",
    },
    {
        accessorKey: "PONTO_EXTRA_MEDIA",
        header: "P.E.",
        cell: ({ getValue }) => getValue() ?? "0.0",
    },
]