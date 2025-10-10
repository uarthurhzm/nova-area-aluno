import type { LibraryCollectionsResponseDTO } from "@/application/dto/library-collections-response-dto";
import { useBookDetails } from "@/presentation/hooks/use-book-details";
import { DataTable } from "../../ui/data-table";
import { columns as details } from "../book-details/columns";
import { createColumns } from "../book-examples/columns";
import { useBookDetailsDialog } from "@/presentation/hooks/use-book-details-dialog";

export default function BookDetailsDialog({ book }: { book: LibraryCollectionsResponseDTO }) {
    const { data, loading } = useBookDetails(book);
    const { handleReserve } = useBookDetailsDialog();

    const examples = createColumns({ onReserve: handleReserve });



    if (loading)
        return <div>Carregando...</div>

    if (data.length === 0) {
        return <div>Nenhum exemplar encontrado.</div>
    }

    return (
        <div className="flex flex-col gap-4">
            <Title text={`Quantidade de exemplares: ${data.length || 0}`} />
            <DataTable data={[data[0]]} columns={details} pagination={false} />
            <Title text={`Exemplare(s)`} />
            <DataTable data={data} columns={examples} pagination={false} />
        </div>
    )
}

const Title = ({ text }: { text: string }) => {
    return (
        <span className="text-2xl font-semibold">{text}</span>
    )
}