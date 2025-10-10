import { columns } from "@/presentation/components/specific/extension-certificates/columns";
import { Button } from "@/presentation/components/ui/button";
import { DataTable } from "@/presentation/components/ui/data-table";
import { TopicTitle } from "@/presentation/components/ui/topic-title";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useStudentExtensionCertificates } from "../hooks/use-student-extension-certificates";

export default function ExtensionCertificatePage() {

    const { data, loading } = useStudentExtensionCertificates();

    return (
        <StandardSubpage title="Certificado de Curso de Extensão">
            <Button
                className="w-full md:w-auto mb-4"
                onClick={() => window.open('https://apps.unilago.edu.br/extensao', '_blank')}
            >
                Ver Cursos de Extensão <ArrowRight />
            </Button>
            <hr className="mb-2" />
            <TopicTitle title="Meus Certificados" />
            {loading ? <Skeleton className="h-24 w-full rounded" /> : <DataTable columns={columns} data={data} />}
        </StandardSubpage>
    )
}