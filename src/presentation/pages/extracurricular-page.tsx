import { createColumns } from "@/presentation/components/specific/activities/columns";
import { DataTable } from "@/presentation/components/ui/data-table";
import { Form } from "@/presentation/components/ui/form";
import FormFileInput from "@/presentation/components/ui/form-file-input";
import FormInput from "@/presentation/components/ui/form-input";
import FormSelect from "@/presentation/components/ui/form-select";
import FormTextarea from "@/presentation/components/ui/form-textarea";
import SubmitButton from "@/presentation/components/ui/submit-button";
import { CloudUpload } from "lucide-react";
import FormInputNumber from "../components/ui/form-number-input";
import StandardSubpage from "../components/ui/standart-subpage";
import { useActivitiesTypes } from "../hooks/use-activities-types";
import { useActivityForm } from "../hooks/use-activity-form";
import { useDeleteExtracurricularActivity } from "../hooks/use-delete-extracurricular-activity";
import { useStudentActivities } from "../hooks/use-student-activities";
import { Skeleton } from "../components/ui/skeleton";
import Flex from "../components/ui/flex";

export default function ExtracurricularPage() {

    const { data: activitiesTypes, loading: loadingActivitiesTypes } = useActivitiesTypes();
    const { data: activities, loading: loadingActivities, refresh } = useStudentActivities();
    const { handleDelete } = useDeleteExtracurricularActivity(refresh);
    const columns = createColumns({ onDelete: handleDelete });
    const { form, handleSubmit } = useActivityForm(refresh);

    if (loadingActivities || loadingActivitiesTypes) {
        return (
            <StandardSubpage title="Atividades Complementares">
                <div className="flex flex-col gap-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Flex>{[...Array(3)].map((_, i) => (<Skeleton key={i} className="h-10 md:w-1/3 mr-4" />))}</Flex>
                    <Skeleton className="h-10 w-full" />
                    <div className="self-end">
                        <Skeleton className="h-10 w-32" />
                    </div>
                    <Skeleton className="h-128 w-full" />
                </div>
            </StandardSubpage>
        )
    }

    return (
        <StandardSubpage title="Atividades Complementares">
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormSelect
                        control={form.control}
                        name="activityId"
                        optionName="NM_ATV"
                        valueName="CD_ATV"
                        label="Tipo de atividade"
                        options={activitiesTypes}
                    />
                    <FormTextarea
                        control={form.control}
                        name="description"
                        label="Descrição da atividade"
                        placeholder="Escreva sua mensagem aqui..."
                        rows={8}
                    />
                    <div className="flex flex-col md:flex-row w-full gap-4">
                        <div className="md:w-1/3">
                            <FormInput
                                control={form.control}
                                name="startDate"
                                label="Data de início"
                                type="date"
                            />
                        </div>
                        <div className="md:w-1/3">
                            <FormInput
                                control={form.control}
                                name="endDate"
                                label="Data de término"
                                type="date"
                            />
                        </div>
                        <div className="md:w-1/3">
                            <FormInputNumber
                                control={form.control}
                                name="hours"
                                label="Carga horária (horas)"
                                type="number"
                            />
                        </div>
                    </div>
                    <div>
                        <FormFileInput
                            control={form.control}
                            name="pdf"
                            label="Enviar arquivo"
                            accept=".pdf"
                        />
                        <small className="text-blue-500">Atenção! É Permitido somente arquivos das seguintes extensões: <b>.pdf</b></small>
                    </div>

                    <div className="text-end">
                        <SubmitButton Icon={CloudUpload} form={form} text="Enviar" />
                    </div>
                </form>
            </Form>
            <div className="mt-8">
                <DataTable columns={columns} data={activities} />
            </div>
        </StandardSubpage>
    )
}