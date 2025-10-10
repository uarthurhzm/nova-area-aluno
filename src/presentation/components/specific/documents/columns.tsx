import type { StudentAttestsResponseDTO } from "@/application/dto/student-attests-response-dto";
import { formatDate } from "@/presentation/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { Printer } from "lucide-react";
import { Button } from "../../ui/button";

export const columns: ColumnDef<StudentAttestsResponseDTO>[] = [
    {
        accessorKey: "DT_ABERT",
        header: "Data",
        cell: ({ row }) => formatDate(row.original.DT_ABERT)
    },
    {
        accessorKey: "NM_TRC",
        header: "Descrição",
    },
    {
        accessorKey: "NUM_PROT",
        header: "Protocolo",
    },
    {
        accessorKey: "COD_VERIFICA",
        header: "Código de Verificação",
    },
    {
        accessorKey: "SITUACAO",
        header: "Ações",
        cell: ({ row }) => {
            const document = row.original;
            return (
                <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                        window.open(`https://apps.unilago.edu.br/autenticidade?atestado=1&protocolo=${document.NUM_PROT}`)
                    }}
                >
                    <Printer />
                </Button>
            )
        },
    }
]