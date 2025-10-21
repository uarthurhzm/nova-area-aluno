import { DOCUMENT_OPTIONS } from "@/shared/constants/attendance/document-options";
import { ATTENDANCE_DOCUMENT_SUBOPTION_ID, getSubjectsWithSuboptions } from "@/shared/constants/attendance/subjects-with-suboptions";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Form } from "../components/ui/form";
import FormFileInput from "../components/ui/form-file-input";
import FormSelect from "../components/ui/form-select";
import FormTextarea from "../components/ui/form-textarea";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useProtocolTypes } from "../hooks/data/use-protocol-types";
import { useSectors } from "../hooks/data/use-sectors";
import { useAttendanceForm } from "../hooks/form/use-attendance-form";
import { usePostAttendanceRequest } from "../hooks/form/use-post-attendance-request";
import { useStudentDisciplines } from "../hooks/use-student-disciplines";
import FormMultiSelect from "../components/ui/form-multi-select";

export default function AttendancePage() {
    const { form, handleSubmit } = useAttendanceForm();
    const { postAttendanceRequest } = usePostAttendanceRequest()

    const selectedSector = form.watch("sector");
    const selectedSubject = form.watch("subject");
    const selectedRequestType = form.watch("requestType");

    const { data: sectors, loading: loadingSectors } = useSectors();
    const { data: protocolTypes, loading: loadingProtocolTypes } = useProtocolTypes(selectedSector ?? -1);
    const { data: studentDisciplines, loading: loadingStudentDisciplines } = useStudentDisciplines();
    const [protocolSubOptions, setProtocolSubOptions] = useState<{ id: number, name: string }[]>([]);
    const [showRequestType, setShowRequestType] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (loadingSectors || loadingProtocolTypes || loadingStudentDisciplines) {
        return (
            <StandardSubpage title="Requerimento de Atendimento">
                <Skeleton className="h-10 w-full" />
            </StandardSubpage>
        )
    }

    const handleFormSubmit = async () => {
        //NOTE - Requerimento de documento - solicitar / requerer
        if (selectedSubject == ATTENDANCE_DOCUMENT_SUBOPTION_ID && selectedRequestType == 2) {
            setIsSubmitting(true);

            const option = DOCUMENT_OPTIONS.find(opt => opt.id === Number(form.getValues("documentId")));
            try {
                await postAttendanceRequest(option!);
            } catch (error) {
                console.log(`Erro ao enviar requerimento de documento: ${error}`);
            }
            finally {
                setIsSubmitting(false);
            }
        }

        handleSubmit();
    }

    return (
        <StandardSubpage title="Requerimento de Atendimento">
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormSelect
                        control={form.control}
                        label="Setor"
                        name="sector"
                        optionName="NM_SET"
                        valueName="CD_SET"
                        options={sectors}
                    />

                    <FormSelect
                        control={form.control}
                        label="Assunto"
                        name="subject"
                        optionName="DESCR_REQUERIMENTO"
                        valueName="CD_REQ"
                        options={protocolTypes}
                        onChange={(value) => {
                            const subOptions = getSubjectsWithSuboptions(studentDisciplines).find(item => item.subject === Number(value));
                            setProtocolSubOptions(subOptions ? subOptions.options : []);
                            setShowRequestType(Number(value) === ATTENDANCE_DOCUMENT_SUBOPTION_ID);
                        }}
                    />

                    {protocolSubOptions.length > 0 &&
                        selectedSubject == ATTENDANCE_DOCUMENT_SUBOPTION_ID ? (
                        <FormSelect
                            control={form.control}
                            label="Detalhamento"
                            name={"documentId"}
                            options={protocolSubOptions}
                        />
                    ) : (
                        <FormMultiSelect
                            control={form.control}
                            label="Detalhamento"
                            name="disciplineIds"
                            options={protocolSubOptions}
                        />
                    )}

                    {showRequestType && (
                        <FormSelect
                            control={form.control}
                            label="Tipo de Requerimento"
                            name="requestType"
                            options={[
                                { id: '1', name: 'Solução de problema' },
                                { id: '2', name: 'Solicitar / Requerer' }
                            ]}
                        />
                    )}

                    <FormTextarea
                        control={form.control}
                        label="Descrição"
                        name="description"
                        placeholder="Informe a descrição do requerimento"
                    />

                    <FormFileInput
                        control={form.control}
                        label="Anexar Arquivo"
                        name="file"
                    />

                    <div className="text-end">
                        <Button
                            type="button"
                            className="w-full md:w-auto"
                            onClick={handleFormSubmit}
                            disabled={form.formState.isSubmitting || isSubmitting}
                        >
                            {isSubmitting || form.formState.isSubmitting
                                ? <>Enviando <LoaderCircle className="animate-spin" /></>
                                : <>Enviar Requerimento <Send /></>
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </StandardSubpage>
    )
}