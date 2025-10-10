import { columns } from "@/presentation/components/specific/opportunity/columns";
import { DataTable } from "@/presentation/components/ui/data-table";
import Loading from "../components/ui/loading";
import StandardSubpage from "../components/ui/standart-subpage";
import { useCourseOpportunities } from "../hooks/use-course-opportunities";

export default function CareerOpportunitiesPage() {

    const { data, loading } = useCourseOpportunities();

    if (loading)
        return <Loading />

    return (
        <StandardSubpage title="Estágios & Oportunidades">
            <DataTable columns={columns} data={data} />
        </StandardSubpage>
    )
}