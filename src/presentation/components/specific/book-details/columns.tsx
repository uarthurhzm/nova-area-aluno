import type { BookDetailsResponseDTO } from "@/application/dto/book-details-response-dto";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BookDetailsResponseDTO>[] = [
    {
        accessorKey: "CLASS_ACV",
        header: "Classificação do Acervo",
    },
    {
        accessorKey: "IDIOMA",
        header: "Idioma",
    },
    {
        accessorKey: "CIDADE",
        header: "Cidade"
    },
    
]