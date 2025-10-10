import type { StudentEnrollmentCertificatesResponseDTO } from "@/application/dto/student-enrollment-certificates-response-dto";
import { createColumns } from "@/presentation/components/specific/available-enrollment-certificates/columns";
import { columns as documentsColumns } from "@/presentation/components/specific/documents/columns";
import AlertContainer from "@/presentation/components/ui/alert-container";
import AlertText from "@/presentation/components/ui/alert-text";
import Column from "@/presentation/components/ui/Column";
import { DataTable } from "@/presentation/components/ui/data-table";
import Flex from "@/presentation/components/ui/flex";
import { Form } from "@/presentation/components/ui/form";
import FormInput from "@/presentation/components/ui/form-input";
import FormPhone from "@/presentation/components/ui/form-phone-input";
import FormSelect from "@/presentation/components/ui/form-select";
import SubmitButton from "@/presentation/components/ui/submit-button";
import { TopicTitle } from "@/presentation/components/ui/topic-title";
import { DOCUMENT_TYPES } from "@/shared/constants/document-type";
import { Send } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useAuth } from "../contexts/AuthContext";
import { useEnrollmentCertificateForm } from "../hooks/use-enrollment-certificate-form";
import { useStudentAttests } from "../hooks/use-student-attests";
import { useStudentEnrollmentCertificates } from "../hooks/use-student-enrollment-certificates";

export default function EnrollmentCertificatePage() {

    const { data, loading, refresh } = useStudentEnrollmentCertificates();

    if (loading) {
        return (
            <StandardSubpage title="Atestado de Matricula">
                <TopicTitle title="Requerimento de Atestado de Matrícula" />
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
                <div className="mt-8 space-y-6">
                    <TopicTitle title="Lista de Atestados disponíveis para pagamento" />
                    <Skeleton className="h-40 w-full" />
                    <TopicTitle title="Lista de Atestados liberados" />
                    <Skeleton className="h-40 w-full" />
                </div>
                <AlertContainer>
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                </AlertContainer>
                <div className="mt-8">
                    <TopicTitle title="Atestados" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </StandardSubpage>
        )
    }

    return (
        <StandardSubpage title="Atestado de Matricula">
            <TopicTitle title="Requerimento de Atestado de Matrícula" />
            <FormSection onPost={refresh} />
            {data && <AvailableDocumentsSection data={data} />}
            <AlertSection />
            <DocumentsSection />
        </StandardSubpage>
    )
}


const FormSection = ({ onPost }: { onPost: () => void }) => {

    const { form, handleSubmit } = useEnrollmentCertificateForm(onPost);

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
                        <FormSelect
                            control={form.control}
                            name="documentType"
                            label="Tipo de Atestado"
                            options={DOCUMENT_TYPES}
                        />
                    </Column>
                </Flex>
                <FormInput
                    control={form.control}
                    type="email"
                    name="email"
                    label="E-mail"
                    placeholder="Digite seu email"
                />
                <div className="text-end">
                    <SubmitButton Icon={Send} text="Enviar requerimento" form={form} className="md:w-auto w-full" />
                </div>
            </form>
        </Form>
    )
}

const AvailableDocumentsSection = ({ data }: { data: StudentEnrollmentCertificatesResponseDTO[] }) => {
    const certificatesColumns = createColumns(useAuth().userData!);
    const notPaidCertificates = data.filter(certificate => certificate.CD_BXAREC === 0);
    const paidCertificates = data.filter(certificate => certificate.CD_BXAREC == 8 || certificate.CD_BXAREC == 9);
    return (
        <>
            {notPaidCertificates.length > 0 && (
                <>
                    <TopicTitle title="Lista de Atestados disponíveis para pagamento" />
                    <DataTable columns={certificatesColumns} data={notPaidCertificates} pagination={false} />
                </>
            )}
            {paidCertificates.length > 0 && (
                <>
                    <TopicTitle title="Lista de Atestados liberados" />
                    <DataTable columns={certificatesColumns} data={paidCertificates} pagination={false} />
                </>
            )}
        </>
    )
}

const AlertSection = () => {
    return (
        <AlertContainer>
            <AlertText text="Importante: " />
            <p>Será gerado um débito no valor de R$ 15,00 referente ao Atestado requerido,após a solicitação dirija-se até a tesouraria e quite seu débito para que o procedimento de confecção seja iniciado.</p> <br />
            <p>Segue abaixo algumas informações sobre prazos para confecção de documentos:</p> <br />
            <p><b>Prazos:</b></p> <br />

            <b>Histórico Escolar:</b> 30 dias corridos após o pagamento. <br />
            <b>Atestado de matrícula:</b> 5 dias úteis após o pagamento. <br />
            <b>Declaração de Estágio:</b> 10 dias úteis após o pagamento. <br />
            <b>Ementa de disciplinas:</b> 5 dias úteis após o pagamento.
        </AlertContainer>

    )
}

const DocumentsSection = () => {

    const { data, loading } = useStudentAttests();

    return (
        <div className="mt-8">
            <TopicTitle title="Atestados" />
            {loading ? <Skeleton className="h-24 w-full" /> : <DataTable columns={documentsColumns} data={data} pagination={false} />}
        </div>
    )
}