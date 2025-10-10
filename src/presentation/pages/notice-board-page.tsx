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

    const handlePriorityColor = (priority: 'Alta' | 'Media' | 'Baixa') => {
        switch (priority) {
            case 'Alta':
                return 'bg-red-500 text-white rounded-full px-2 py-1 text-sm';
            case 'Media':
                return 'bg-yellow-500 text-white rounded-full px-2 py-1 text-sm';
            case 'Baixa':
                return 'bg-green-500 text-white rounded-full px-2 py-1 text-sm';
            default:
                return '';
        }
    }

    return (
        <StandardSubpage title="Mural de Avisos">
            <Flex className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.length > 0 ? data.map((notice, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow hover:scale-[1.02]">
                        <CardHeader>
                            <CardTitle>
                                <Flex>
                                    <Column size={6}>
                                        <span className="text-lg">{notice.TITULO} • </span>
                                        <span className={handlePriorityColor(notice.PRIORIDADE)}>{notice.PRIORIDADE}</span>
                                    </Column>
                                    <Column size={6}>
                                        <span className="text-sm text-gray-500">{formatDate(notice.DATA)} • </span>
                                        <span className="text-sm text-gray-500">{notice.USUARIO}</span>
                                    </Column>
                                </Flex>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="line-clamp-3 overflow-hidden"
                                dangerouslySetInnerHTML={{ __html: notice.RECADO }}
                            ></div>
                            {notice.RECADO.length > 150 && (
                                <div className="text-end mt-3">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="link" className="text-blue-500">Ver mais</Button>
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