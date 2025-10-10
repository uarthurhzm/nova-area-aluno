import { columns } from "@/presentation/components/specific/academic-week/columns";
import { DataTable } from "@/presentation/components/ui/data-table";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useStudentAcademicWeek } from "../hooks/use-student-academic-week";

export default function AcademicWeekPage() {
    const { data, loading } = useStudentAcademicWeek();

    return (
        <StandardSubpage title="Certificados de Semana Acadêmica">
            {loading ? <Skeleton className="h-24 w-full rounded" /> : <DataTable columns={columns} data={data} />}
        </StandardSubpage>
    )
}