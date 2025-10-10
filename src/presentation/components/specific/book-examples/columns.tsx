import type { BookDetailsResponseDTO } from "@/application/dto/book-details-response-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";

interface ColumnsProps {
    onReserve: (book: BookDetailsResponseDTO) => void;
}

export const createColumns = ({ onReserve }: ColumnsProps): ColumnDef<BookDetailsResponseDTO>[] => [
    {
        accessorKey: "NR_TOMBO",
        header: "Exemplar",
    },
    {
        accessorKey: "SITUACAO_LIVRO",
        header: "Situação",
        cell: ({ row }) => {
            const situacao = row.original.SITUACAO_LIVRO;
            return situacao.trim() === "RESERVAR" ? (
                <Button type="button" onClick={async () =>  onReserve(row.original)}>Reservar</Button>
            ) : <span>{situacao}</span>
        }
    },
    {
        accessorKey: "DT_PREVDEV",
        header: "Prev. Devolução",
        cell: ({ row }) => row.original.DT_PREVDEV || '-'
    },

]