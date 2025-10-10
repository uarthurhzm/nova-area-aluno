import { columns } from "@/presentation/components/specific/ies-professors/columns";
import { DataTable } from "@/presentation/components/ui/data-table";
import { Skeleton } from "@/presentation/components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useIESProfessors } from "../hooks/use-ies-professors";

export default function IESProfessorsPage() {

    const { data, loading } = useIESProfessors();

    return (
        <StandardSubpage title="Professores da IES">
            {loading ? <Skeleton className="h-24 w-full rounded" /> : <DataTable columns={columns} data={data} />}
        </StandardSubpage>
    )
}