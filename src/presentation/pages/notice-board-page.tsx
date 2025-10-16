import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Column from "../components/ui/Column";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import Flex from "../components/ui/flex";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useNotices } from "../hooks/use-notices";
import { formatDate } from "../utils/format-date";

export default function NoticeBoardPage() {
    const { data, loading } = useNotices();

    if (loading) {
        return (
            <StandardSubpage title="Mural de Avisos">
                <Flex className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, idx) => (
                        <Card key={idx} className="hover:shadow-lg transition-shadow hover:scale-[1.02]">
                            <CardHeader>
                                <CardTitle>
                                    <Flex>
                                        <Column size={6}>
                                            <Skeleton className="h-6 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-1/4" />
                                        </Column>
                                    </Flex>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </Flex>
            </StandardSubpage>
        )
    }

    const handlePriorityColor = (priority: '1' | '2' | '3') => {
        switch (priority) {
            case '1':
                return 'bg-green-500 text-white rounded-full px-2 py-1 text-sm';
            case '2':
                return 'bg-yellow-500 text-white rounded-full px-2 py-1 text-sm';
            case '3':
                return 'bg-red-500 text-white rounded-full px-2 py-1 text-sm';
            default:
                return '';
        }
    }

    const handlePriorityText = (priority: '1' | '2' | '3') => {
        switch (priority) {
            case '1':
                return 'Baixa';
            case '2':
                return 'Média';
            case '3':
                return 'Alta';
            default:
                return '';
        }
    }

    return (
        <StandardSubpage title="Mural de Avisos">
            <Flex className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.length > 0 ? data.map((notice, idx) => (
                    <Card
                        key={idx}
                        className="hover:shadow-lg transition-shadow hover:scale-[1.02] flex flex-col h-full"
                    >
                        <CardHeader className="pb-2">
                            <CardTitle>
                                <Flex className="justify-between items-start gap-2 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold">{notice.TITULO}</span>
                                        <span className={handlePriorityColor(notice.PRIORIDADE)}>
                                            {handlePriorityText(notice.PRIORIDADE)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end text-right">
                                        <span className="text-xs text-gray-500">{formatDate(notice.DATA)}</span>
                                        <span className="text-xs text-gray-400">{notice.USUARIO}</span>
                                    </div>
                                </Flex>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                            <div
                                className="line-clamp-3 overflow-hidden text-sm text-gray-700"
                                dangerouslySetInnerHTML={{ __html: notice.RECADO }}
                            ></div>
                            {notice.RECADO.length > 150 && (
                                <div className="text-end mt-3">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="link" className="text-blue-500 p-0 h-auto min-h-0">Ver mais</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{notice.TITULO}</DialogTitle>
                                                <DialogDescription>
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: notice.RECADO }}
                                                    ></div>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )) : (
                    <p>Nenhum aviso encontrado.</p>
                )}
            </Flex>
        </StandardSubpage >
    )
}