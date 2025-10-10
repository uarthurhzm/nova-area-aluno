import type { StudentReservedBook } from "@/application/dto/student-reserved-book";
import type { ColumnDef } from "@tanstack/react-table";
import BookCover from "../../ui/book-cover";
import { formatDate } from "@/presentation/utils/format-date";
import { Button } from "../../ui/button";
import { Trash } from "lucide-react";

type ColumnProps = {
    onCancel: (book: StudentReservedBook) => Promise<void>
}

export const createColumns = ({ onCancel }: ColumnProps): ColumnDef<StudentReservedBook>[] => [
    {
        accessorKey: "image",
        header: "Imagem",
        cell: ({ row }) => {
            const data = row.original
            return (
                <BookCover cd_acv={data.CD_ACV} />
            )
        },
    },
    {
        accessorKey: "NM_ACV",
        header: "Título",
    },
    {
        accessorKey: "NR_TOMBO",
        header: "Exemplar",
    },
    {
        accessorKey: "DESCRICACAO",
        header: "Descrição",
    },
    {
        accessorKey: "RETIRADA",
        header: "Retirada",
        cell: ({ row }) => formatDate(row.original.RETIRADA)
    },
    {
        accessorKey: "cancel",
        header: "Cancelar Inscrição",
        cell: ({ row }) => {
            const data = row.original
            return (
                <Button
                    variant={"destructive"}
                    onClick={async () => await onCancel(data)}
                >
                    <Trash />
                    Cancelar
                </Button>
            )
        }
    },
]