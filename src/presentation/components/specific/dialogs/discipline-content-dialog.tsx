import type { StudentDisciplinesResponseDTO } from "@/application/dto/student-disciplines-response-dto";
import { useDisciplineContent } from "@/presentation/hooks/use-discipline-content";
import { DataTable } from "../../ui/data-table";
import { columns } from "../discipline-content/columns";

export default function DisciplineContentDialog({ discipline }: { discipline: StudentDisciplinesResponseDTO }) {
    const { data, loading } = useDisciplineContent(discipline.ID_DISC);

    if (loading)
        return <>Carregando...</>

    return (
        <DataTable data={data || []} columns={columns} />
    )
}