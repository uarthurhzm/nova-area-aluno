import ContentWrapper from "@/presentation/components/ui/content-wrapper";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/presentation/components/ui/tooltip";
import { TopicTitle } from "@/presentation/components/ui/topic-title";
import { DOWNLOADS } from "@/shared/constants/downloads";
import { Book, type LucideIcon } from "lucide-react";
import DisciplineContentDialog from "../components/specific/dialogs/discipline-content-dialog";
import Flex from "../components/ui/flex";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useStudentDisciplines } from "../hooks/use-student-disciplines";

export default function DownloadsPage() {
    const { data: disciplines, loading } = useStudentDisciplines();

    if (loading) {
        return (
            <StandardSubpage title="Materiais de Aula & Downloads">
                <Flex>{[...Array(5)].map((_, i) => (<Skeleton key={i} className="w-full md:w-48 h-32 mr-4" />))}</Flex>
                <div className="mt-8 overflow-x-auto whitespace-nowrap">{[...Array(12)].map((_, i) => (<Skeleton key={i} className="inline-block w-full md:w-48 h-32 mr-4" />))}</div>
            </StandardSubpage>
        )
    }

    return (
        <StandardSubpage title="Materiais de Aula & Downloads">
            <TopicTitle title="Downloads de Arquivos" />
            <ContentWrapper className="flex flex-col md:flex-row gap-4">
                {DOWNLOADS.map((download) => (
                    <Card
                        key={download.name}
                        name={download.name}
                        Icon={download.icon}
                        onClick={() => window.open(download.url, '_blank')}
                    />
                ))}
            </ContentWrapper>
            <div className="mt-8">
                <TopicTitle title="Materiais de Aula" />
                <div className="space-y-4">
                    {disciplines.length === 0 && (<p>Nenhuma disciplina encontrada.</p>)}
                    <ContentWrapper className="flex flex-col md:flex-row gap-4 overflow-x-auto">
                        {disciplines.map((discipline) => (
                            <Tooltip key={discipline.ID_DISC}>
                                <TooltipTrigger>
                                    <Dialog key={discipline.ID_DISC}>
                                        <DialogTrigger asChild>
                                            <Card
                                                name={discipline.NM_DISC}
                                                Icon={Book}

                                            />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{discipline.NM_DISC}</DialogTitle>
                                            </DialogHeader>
                                            <DisciplineContentDialog discipline={discipline} />
                                        </DialogContent>
                                    </Dialog>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Clique para ver os arquivos disponíveis para esta disciplina.
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </ContentWrapper>
                </div>
            </div>
        </StandardSubpage >
    )
}

const Card = ({ name, Icon, onClick }: { name: string, Icon: LucideIcon, onClick?: () => void }) => {
    return (
        <div
            className="w-full md:w-48 flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow  h-32"
            onClick={onClick}
        >
            <Icon className="w-16 h-16 mb-4" />
            <p className="text-center text-sm font-medium">{name}</p>
        </div>
    )
}