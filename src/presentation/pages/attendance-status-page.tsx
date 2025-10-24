import { columns } from "../components/specific/attendance/columns";
import { DataTable } from "../components/ui/data-table";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useAttendanceRequests } from "../hooks/attendance/use-attendance-requests";

export default function AttendanceStatusPage() {
    const { data, loading } = useAttendanceRequests();

    if (loading) {
        return (
            <StandardSubpage title="Status dos Requerimentos">
                <Skeleton className="h-20" />
            </StandardSubpage>
        )
    }

    console.log(data);


    return (
        <StandardSubpage title="Status dos Requerimentos">
            <DataTable data={data} columns={columns} />
        </StandardSubpage>
    )
}