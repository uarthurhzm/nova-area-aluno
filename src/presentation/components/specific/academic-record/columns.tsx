import type { StudentAcademicRecordResponseDTO } from "@/application/dto/student-academic-record-response-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { Printer } from "lucide-react";
import { Button } from "../../ui/button";
import { formatDate } from "@/presentation/utils/format-date";

export const columns: ColumnDef<StudentAcademicRecordResponseDTO>[] = [
    {
        accessorKey: "NUM_PROT",
        header: "Protocolo",
    },
    {
        accessorKey: "DT_INSC",
        header: "Data de Solicitação",
        cell: ({ row }) => formatDate(row.original.DT_INSC)
    },
    {
        accessorKey: "CD_LANCREC",
        header: "Nosso número",
    },
    {
        accessorKey: "COD_VALIDACAO",
        header: "Validação",
    },
    {
        accessorKey: "",
        header: "Ação",
        cell: ({ row }) => {
            const document = row.original;
            return (
                <Button
                    variant={"outline"}
                    onClick={() => {
                        window.open(`https://apps.unilago.edu.br/secretaria-digital/historico/${document.COD_VALIDACAO}`, "_blank");
                    }}>
                    <Printer />
                </Button>
            )
        },
    }
]