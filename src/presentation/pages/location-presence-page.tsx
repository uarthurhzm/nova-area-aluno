import { Check } from "lucide-react";
import { useState } from "react";
import Flex from "../components/ui/flex";
import { Form } from "../components/ui/form";
import FormInput from "../components/ui/form-input";
import FormSelect from "../components/ui/form-select";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import SubmitButton from "../components/ui/submit-button";
import { useCampus } from "../hooks/use-campus";
import { usePresenceForm } from "../hooks/use-presence-form";
import { useStudentDisciplines } from "../hooks/use-student-disciplines";

export default function LocationPresencePage() {
    const [confirmType, setConfirmType] = useState<"in" | "out">("in");
    const { data: campus, loading: loadingCampus } = useCampus();
    const { data: disciplines, loading: loadingDisciplines } = useStudentDisciplines();
    const { form, handleSubmit } = usePresenceForm(confirmType, disciplines);


    if (loadingDisciplines || loadingCampus) {
        return (
            <StandardSubpage title="Confirmação de Presença via Localização">
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (<Skeleton key={i} className="h-10 w-full rounded" />))}
                    <Flex className="justify-end mt-4">
                        {[...Array(2)].map((_, i) => (<Skeleton key={i} className="h-10 w-32 rounded" />))}
                    </Flex>
                </div>
            </StandardSubpage>
        );
    }


    return (
        <StandardSubpage title="Confirmação de Presença via Localização">
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormSelect
                        control={form.control}
                        name="disciplineId"
                        label="Disciplina"
                        valueName="ID_DISC"
                        optionName="NM_DISC"
                        options={disciplines}
                    />
                    <FormSelect
                        control={form.control}
                        name="unitId"
                        label="Unidade"
                        valueName="ID"
                        optionName="NM_CAMPUS"
                        options={campus}
                    />
                    <FormInput
                        control={form.control}
                        name="date"
                        label="Referente ao dia"
                        type="date"
                        disabled={true}
                        value={new Date().toISOString().split('T')[0]}

                    />
                    <Flex className="justify-end mt-4">
                        <SubmitButton
                            Icon={Check}
                            form={form}
                            text="Confirmar entrada"
                            onClick={() => setConfirmType("in")}
                        />
                        <SubmitButton
                            variant={"destructive"}
                            Icon={Check}
                            form={form}
                            text="Confirmar saída"
                            onClick={() => setConfirmType("out")}
                        />
                    </Flex>
                </form>
            </Form>
        </StandardSubpage>
    )

}