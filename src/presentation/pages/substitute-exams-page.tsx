
import type { StudentSubstituteDisciplinesResponseDTO } from "@/application/dto/student-dp-disciplines-response-dto";
import type { StudentSubstituteExamResponseDTO } from "@/application/dto/student-substitute-exam-response-dto";
import { createColumns } from "@/presentation/components/specific/substitute-exams/columns";
import Column from "@/presentation/components/ui/Column";
import { DataTable } from "@/presentation/components/ui/data-table";
import Flex from "@/presentation/components/ui/flex";
import { Form } from "@/presentation/components/ui/form";
import FormInput from "@/presentation/components/ui/form-input";
import FormPhone from "@/presentation/components/ui/form-phone-input";
import FormSelect from "@/presentation/components/ui/form-select";
import SubmitButton from "@/presentation/components/ui/submit-button";
import { TopicTitle } from "@/presentation/components/ui/topic-title";
import { Send } from "lucide-react";
import NoPermission from "../components/ui/no-permission";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useAuth } from "../contexts/AuthContext";
import { useDeleteSubstituteRequest } from "../hooks/use-delete-substitute-request";
import { useStudentDocumentsPermission } from "../hooks/use-student-documents-permission";
import { useStudentSubstituteDisciplines } from "../hooks/use-student-dp-disciplines";
import { useStudentSubstituteExam } from "../hooks/use-student-substitute-exam";
import { useSubstituteExamForm } from "../hooks/use-substitute-exam-form";


export default function SubstituteExamsPage() {
    const { data, loading, refresh: disciplinesRefresh } = useStudentSubstituteDisciplines();
    const { data: permissions, loading: permissionsLoading } = useStudentDocumentsPermission();
    const { data: documents, loading: documentsLoading, refresh: documentsRefresh } = useStudentSubstituteExam();

    if (loading || permissionsLoading || documentsLoading) {
        return (
            <StandardSubpage title="Provas Substitutivas">
                <TopicTitle title="Requerimento de Provas Substitutivas" />
                <div className="space-y-6">
                    <Flex>
                        <Column size={6}>
                            <Skeleton className="h-10 w-full" />
                        </Column>
                        <Column size={6}>
                            <Skeleton className="h-10 w-full" />
                        </Column>
                    </Flex>
                    <Skeleton className="h-10 w-full" />
                    <div className="text-end">
                        <Skeleton className="h-10 md:w-auto w-full" />
                    </div>
                </div>
                <div className="mt-8">
                    <TopicTitle title="Provas Substitutivas Requeridas" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </StandardSubpage>
        )
    }

    if (permissions.permission === 1)
        return <NoPermission title="Provas Substitutivas" />

    return (
        <StandardSubpage title="Provas Substitutivas">
            <TopicTitle title="Requerimento de Provas Substitutivas" />
            <FormSection disciplines={data} documentsRefresh={documentsRefresh} disciplinesRefresh={disciplinesRefresh} />
            <DocumentsSection documents={documents} documentsRefresh={documentsRefresh} disciplinesRefresh={disciplinesRefresh} />
        </StandardSubpage>
    )
}

const FormSection = ({ disciplines, documentsRefresh, disciplinesRefresh }: { disciplines: StudentSubstituteDisciplinesResponseDTO[]; documentsRefresh: () => void; disciplinesRefresh: () => void }) => {
    const { form, handleSubmit } = useSubstituteExamForm(documentsRefresh, disciplinesRefresh);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Flex>
                    <Column size={6}>
                        <FormPhone
                            control={form.control}
                            name="phone"
                            label="Telefone"
                            placeholder="Digite seu telefone"
                        />
                    </Column>
                    <Column size={6}>

                        <FormInput
                            control={form.control}
                            type="email"
                            name="email"
                            label="E-mail"
                            placeholder="Digite seu email"
                        />
                    </Column>
                </Flex>
                <FormSelect
                    control={form.control}
                    valueName="CD_DISC"
                    optionName="NM_DISC"
                    name="disciplineId"
                    label="Disciplina"
                    options={disciplines}
                />
                <div className="text-end">
                    <SubmitButton Icon={Send} text="Enviar requerimento" form={form} className="md:w-auto w-full" />
                </div>
            </form>
        </Form >
    )
}

const DocumentsSection = ({ documents, documentsRefresh, disciplinesRefresh }: { documents: StudentSubstituteExamResponseDTO[]; documentsRefresh: () => void; disciplinesRefresh: () => void }) => {

    const { handleDelete } = useDeleteSubstituteRequest(documentsRefresh, disciplinesRefresh);
    const { userData } = useAuth();
    const columns = createColumns({ userData: userData!, onDelete: handleDelete });

    return (
        <div className="mt-8">
            <TopicTitle title="Provas Substitutivas Requeridas" />
            <DataTable columns={columns} data={documents} />
        </div>
    )
}
