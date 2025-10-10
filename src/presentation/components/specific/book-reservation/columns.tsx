import type { LibraryCollectionsResponseDTO } from "@/application/dto/library-collections-response-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import BookDetailsDialog from "../dialogs/book-details-dialog";
import BookCover from "../../ui/book-cover";

export const columns: ColumnDef<LibraryCollectionsResponseDTO>[] = [
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
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Título
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: "NM_AUTOR1",
        header: "Autor(es)",
        cell: ({ row }) => {
            const data = row.original
            return `${data.NM_AUTOR1} ${data.NM_AUTOR2 || ""}`
        },
    },
    {
        accessorKey: "CLAS_AUT",
        header: "Clas. Livro",
    },
    {
        accessorKey: "CLASS_ACV",
        header: "Clas. Autor",
    },
    {
        accessorKey: "EDIT_PROD",
        header: "Editora",
    },
    {
        accessorKey: "NM_TPACV",
        header: "Tipo",
    },
    {
        accessorKey: "TOTAL",
        header: "Total",
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const book = row.original;

            return (
                <Dialog key={book.CD_ACV}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Search />
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            Ver detalhes
                        </TooltipContent>
                    </Tooltip>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{book.NM_ACV}</DialogTitle>
                        </DialogHeader>
                        <BookDetailsDialog book={book} />
                    </DialogContent>
                </Dialog>
            );
        }
    },
]