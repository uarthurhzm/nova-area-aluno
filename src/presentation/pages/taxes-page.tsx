import { columns } from "@/presentation/components/specific/taxes/columns";
import { DataTable } from "@/presentation/components/ui/data-table";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useTaxes } from "../hooks/use-taxes";

export default function TaxesPage() {

    const { data, loading } = useTaxes();

    return (
        <StandardSubpage title="Taxas e Emolumentos">
            {loading ? <Skeleton className="h-24 w-full rounded" /> : <DataTable columns={columns} data={data} />}
        </StandardSubpage>
    )
}