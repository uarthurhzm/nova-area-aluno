import type { LoanedBookResponseDTO } from "@/application/dto/loaned-book-response-dto";
import { formatDate } from "@/presentation/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { ReceiptText, RefreshCcw } from "lucide-react";
import { Button } from "../../ui/button";

interface ColumnsProps {
    onRenew: (book: LoanedBookResponseDTO) => void;
    onProof: (book: LoanedBookResponseDTO) => void;
}

export const createColumns = ({ onRenew, onProof }: ColumnsProps): ColumnDef<LoanedBookResponseDTO>[] => [
    {
        accessorKey: "NM_ACV",
        header: "Título do Acervo",
    },
    {
        accessorKey: "DT_DEV",
        header: "Devolução",
        cell: ({ row }) => row.original.DT_PREVDEV ? formatDate(row.original.DT_PREVDEV) : '-'
    },
    {
        header: "Opções",
        cell: ({ row }) => {
            const book = row.original;
            return book.STATUS == 1 ?
                book.DT_PREVDEV < new Date().toISOString().split('T')[0] ?
                    <span>Não é possivel renovar este livro. A data limite era até {formatDate(book.DT_PREVDEV)}</span> :
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => onRenew(book)}
                    >
                        <RefreshCcw className="w-4 h-4 mr-1" />
                        Renovar
                    </Button>
                : <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => onProof(book)}
                >
                    <ReceiptText className="w-4 h-4 mr-1" />
                    Comprovante
                </Button>
        },
    }
]