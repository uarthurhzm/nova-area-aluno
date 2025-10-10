import type { StudentAcademicRecordResponseDTO } from "@/application/dto/student-academic-record-response-dto";
import { columns } from "@/presentation/components/specific/academic-record/columns";
import { DataTable } from "@/presentation/components/ui/data-table";
import { Form } from "@/presentation/components/ui/form";
import FormPhone from "@/presentation/components/ui/form-phone-input";
import SubmitButton from "@/presentation/components/ui/submit-button";
import { TopicTitle } from "@/presentation/components/ui/topic-title";
import { Send } from "lucide-react";
import FormEmailInput from "../components/ui/form-email-input";
import NoPermission from "../components/ui/no-permission";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useAuth } from "../contexts/AuthContext";
import { useAcademicRecordForm } from "../hooks/use-academic-record-form";
import { useStudentAcademicRecord } from "../hooks/use-student-academic-record";
import { useStudentDocumentsPermission } from "../hooks/use-student-documents-permission";

export default function AcademicRecordPage() {
    const { userData } = useAuth();
    const { data, loading } = useStudentDocumentsPermission();
    const { data: documents, loading: documentsLoading, refresh } = useStudentAcademicRecord();


    if (loading || documentsLoading || !userData) {
        return (
            <StandardSubpage title="Histórico Escolar">
                <TopicTitle title="Requerimento de Histórico Escolar" />
                <div className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <div className="text-end">
                        <Skeleton className="h-10 md:w-auto w-full" />
                    </div>
                </div>
                <div className="mt-8">
                    <TopicTitle title="Históricos Solicitados" />
                    <div>
                        <Skeleton className="h-12 w-full mb-2" />
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full mb-2" />
                        ))}
                    </div>
                </div>
            </StandardSubpage>
        )
    }
    if (data.permission === 1 || userData.CD_EMP == 40)
        return <NoPermission title="Histórico Escolar" />


    return (
        <StandardSubpage title="Histórico Escolar">
            <TopicTitle title="Requerimento de Histórico Escolar" />
            <FormSection onPost={refresh} />
            <DocumentsSection documents={documents} />
        </StandardSubpage>
    )
}

const FormSection = ({ onPost }: { onPost: () => void }) => {

    const { form, handleSubmit } = useAcademicRecordForm(onPost);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormPhone
                    control={form.control}
                    name="phone"
                    label="Telefone"
                    placeholder="Digite seu telefone"
                />
                <FormEmailInput
                    control={form.control}
                    name="email"
                />
                <div className="text-end">
                    <SubmitButton Icon={Send} text="Enviar requerimento" form={form} className="md:w-auto w-full" />
                </div>
            </form>
        </Form>
    )
}

const DocumentsSection = ({ documents }: { documents: StudentAcademicRecordResponseDTO[] }) => {

    return (
        <div className="mt-8">
            <TopicTitle title="Históricos Solicitados" />
            <DataTable columns={columns} data={documents} />
        </div>
    )
}