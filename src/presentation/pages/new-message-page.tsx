import { Button } from "@/presentation/components/ui/button";
import { Form } from "@/presentation/components/ui/form";
import FormInput from "@/presentation/components/ui/form-input";
import FormSelect from "@/presentation/components/ui/form-select";
import FormTextarea from "@/presentation/components/ui/form-textarea";
import SubmitButton from "@/presentation/components/ui/submit-button";
import { Send, Trash } from "lucide-react";
import StandardSubpage from "../components/ui/standart-subpage";
import { useMessageForm } from "../hooks/use-message-form";
import { useStudentProfessors } from "../hooks/use-student-professors";
import Flex from "../components/ui/flex";
import { Skeleton } from "../components/ui/skeleton";

export default function NewMessagePage() {
    const { data: professors, loading } = useStudentProfessors();
    const { form, handleSubmit } = useMessageForm();

    if (loading) {
        return (
            <StandardSubpage title="Nova mensagem">
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Flex className="justify-end mt-4 space-x-2">
                        <Skeleton className="h-10 w-36" />
                        <Skeleton className="h-10 w-36" />
                    </Flex>
                </div>
            </StandardSubpage>
        )
    }

    return (
        <StandardSubpage title="Nova mensagem">
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormSelect
                        control={form.control}
                        name="professorId"
                        label="Professor"
                        optionName="NM_PRO"
                        valueName="CD_PRO"
                        options={professors}
                    />
                    <FormInput
                        control={form.control}
                        name="subject"
                        label="Assunto"
                        placeholder="Assunto da mensagem"
                    />
                    <FormTextarea
                        control={form.control}
                        name="message"
                        label="Mensagem"
                        placeholder="Escreva sua mensagem aqui..."
                        rows={8}
                    />
                    <Flex className="justify-end mt-4">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => form.reset()}
                        >
                            <Trash /> Limpar campos
                        </Button>
                        <SubmitButton form={form} text="Enviar" Icon={Send} />
                    </Flex>
                </form>
            </Form>
        </StandardSubpage >
    )
}