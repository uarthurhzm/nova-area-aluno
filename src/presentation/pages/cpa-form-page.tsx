import type { CpaStudentQuestionsResponseDTO } from "@/application/dto/cpa-student-questions-response-dto";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/presentation/components/ui/accordion";
import Column from "@/presentation/components/ui/Column";
import Flex from "@/presentation/components/ui/flex";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { CPA_FORM_ANSWERS } from "@/shared/constants/cpa-form-answers";
import { Check } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useCpaFormQuestions } from "../hooks/use-cpa-form-questions";
import { usePostCpaAnswer } from "../hooks/use-post-cpa-answer";

export default function CPAFormPage() {

    const { data, loading } = useCpaFormQuestions();
    const { postAnswer } = usePostCpaAnswer();

    const answered = data?.filter(q => q.RESPOSTA).length || 0;
    const percent = data ? (answered / data.length) * 100 : 0;

    if (loading) {
        return (
            <StandardSubpage title="Questionário CPA">
                {[...Array(19)].map((_, index) => (
                    <Accordion type="single" collapsible key={index} className="mb-4">
                        <AccordionItem value={`item-${index}`}>
                            <Skeleton className="h-24" />
                        </AccordionItem>
                    </Accordion>
                ))}
            </StandardSubpage>
        )
    }

    const onChange = async (value: string, answerId: number) => {
        await postAnswer({ answer: Number(value), answerId })

    }

    return (
        <StandardSubpage title="Questionário CPA">
            {data?.length === 0 && (
                <p className="text-center mt-8">Nenhuma questão encontrada.</p>
            )}

            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <strong>Seu progresso:</strong>
                        <Progress value={percent} className="flex-1 sm:w-48" />
                        <span className="text-sm font-medium">{Math.round(percent)}%</span>
                    </div>
                </div>
            </div>

            <Accordion type="single" collapsible className="mb-4">
                {Object.entries(
                    data.reduce<Record<string, CpaStudentQuestionsResponseDTO[]>>((acc, question) => {
                        const topicKey = `${question.ID_TOPICO}-${question.TITULO || question.TITULOMESTRE}`;
                        if (!acc[topicKey]) acc[topicKey] = [];
                        acc[topicKey].push(question);
                        return acc;
                    }, {})
                ).map(([topicKey, questions], idx) => {
                    const [, topicTitle] = topicKey.split("-");
                    return (
                        <AccordionItem value={`topic-${idx}`} key={topicKey}>
                            <AccordionTrigger className="text-xl flex items-center gap-2">
                                <span>{topicTitle} {questions.every(q => q.RESPOSTA) && (
                                    <Badge variant="success">
                                        Respondido
                                    </Badge>
                                )}</span>

                            </AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                {questions.map((question) => (
                                    <Flex
                                        className="border-b border-t py-6 px-6 w-full justify-between even:bg-gray-100 odd:bg-white dark:even:bg-gray-800 dark:odd:bg-gray-900"
                                        key={question.ID_PERGUNTA}
                                    >
                                        <Column size={6}>
                                            <p>{question.PERGUNTA}</p>
                                        </Column>
                                        <Column size={6}>
                                            <div className="flex flex-row items-center gap-4">
                                                <Select
                                                    onValueChange={(value) => onChange(value, question.ID_RESPOSTA_CPA)}
                                                    defaultValue={question.RESPOSTA?.toString()}
                                                >
                                                    <SelectTrigger className="w-full bg-white">
                                                        <SelectValue placeholder="SELECIONE" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {CPA_FORM_ANSWERS.map(option => (
                                                            <SelectItem key={option.id} value={option.id.toString()}>
                                                                {option.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {!!question.RESPOSTA && <Check className="text-green-500" />}
                                            </div>

                                        </Column>
                                    </Flex>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })
                }
            </Accordion>

        </StandardSubpage>
    )
}