import { columns } from "@/presentation/components/specific/scientific-meeting/columns";
import { DataTable } from "@/presentation/components/ui/data-table";
import { TopicTitle } from "@/presentation/components/ui/topic-title";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useStudentListenerCertificates } from "../hooks/use-student-listener-meeting";
import { useStudentScientificMeeting } from "../hooks/use-student-scientific-meeting";

export default function ScientificMeetingPage() {

    const { data: certificates, loading: loadingCertificates } = useStudentScientificMeeting();
    const { data: listenerCertificates, loading: loadingListenerCertificates } = useStudentListenerCertificates();

    return (
        <StandardSubpage title="Encontros Científicos" withSpace={true}>
            <TopicTitle title="Certificados de Encontro Científico" />
            {loadingCertificates ? <Skeleton className="h-24 w-full rounded" /> : <DataTable columns={columns} data={certificates} />}
            <TopicTitle title="Certificado de Encontro Científico - Ouvinte" />
            {loadingListenerCertificates ? <Skeleton className="h-24 w-full rounded" /> : <DataTable columns={columns} data={listenerCertificates} />}
        </StandardSubpage>
    )
}