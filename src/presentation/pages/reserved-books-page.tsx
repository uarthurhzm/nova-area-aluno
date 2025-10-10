import { createColumns } from "@/presentation/components/specific/reserved-book/columns";
import { DataTable } from "@/presentation/components/ui/data-table";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useCancelReservation } from "../hooks/use-cancel-reservation";
import { useReservedBooks } from "../hooks/use-reserved-books";

export default function ReservedBooksPage() {

    const { data, loading, refresh } = useReservedBooks();
    const { cancelReservation } = useCancelReservation();
    const columns = createColumns({ onCancel: (book) => cancelReservation(book).then(() => refresh()) });

    return (
        <StandardSubpage title="Minhas Reservas">
            {loading ? <Skeleton className="h-24 w-full" /> : <DataTable columns={columns} data={data} pagination={false} />}
        </StandardSubpage>
    )
}