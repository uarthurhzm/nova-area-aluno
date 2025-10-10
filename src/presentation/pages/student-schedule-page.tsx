import { columns } from "../components/specific/course-schedule/columns";
import { DataTable } from "../components/ui/data-table";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useCourseSchedule } from "../hooks/use-course-schedule";

export default function StudentSchedulePage() {

    const { data, loading } = useCourseSchedule();

    return (
        <StandardSubpage title="Horários e Avaliações">
            {loading ? <Skeleton className="h-12 w-full rounded" /> : <DataTable columns={columns} data={data || []} />}
        </StandardSubpage>
    )
}