import { CreditCard, ReceiptText } from "lucide-react";
import AlertContainer from "../components/ui/alert-container";
import AlertText from "../components/ui/alert-text";
import { Button } from "../components/ui/button";
import Flex from "../components/ui/flex";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useStudentDps } from "../hooks/use-student-dps";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useAuth } from "../contexts/AuthContext";

export default function RemedialCourseRequestPage() {

    const { data, loading } = useStudentDps();
    const { userData } = useAuth();

    if (loading) {
        return (
            <StandardSubpage title="Requerimento de DPS">
                <div className="space-y-6">
                    <div>
                        <Skeleton className="h-5 w-64 mb-2" />
                        {[...Array(2)].map((_, i) => (
                            <AlertContainer key={i}>
                                <Flex className="justify-between items-center">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-8 w-56" />
                                </Flex>
                            </AlertContainer>
                        ))}
                    </div>
                    <div>
                        <Skeleton className="h-5 w-64 mb-2" />
                        {[...Array(2)].map((_, i) => (
                            <AlertContainer key={i + "paid"}>
                                <Skeleton className="h-5 w-40" />
                            </AlertContainer>
                        ))}
                    </div>
                    <div>
                        <Skeleton className="h-5 w-64 mb-2" />
                        {[...Array(2)].map((_, i) => (
                            <AlertContainer key={i + "list"}>
                                <Skeleton className="h-5 w-40" />
                            </AlertContainer>
                        ))}
                    </div>
                </div>
            </StandardSubpage>
        )
    }

    if (!data.length)
        return <StandardSubpage title={"Requerimento de DPS"}>
            <AlertContainer>
                <AlertText text="Recurso indisponível." />
            </AlertContainer>
        </StandardSubpage>

    // Categorização seguindo a lógica do sistema antigo
    const remedialByStatus = {
        // DPS disponíveis para requerimento (com botão de pagamento)
        // resp1-curriculo: 
        // - (BXAREC != 8 && HORARIO_CURSO == 1) OU
        // - (BXAREC == 0 && HORARIO_CURSO == 0)
        availableForPayment: data.filter(
            d =>
                (d.BXAREC !== 8 && d.HORARIO_CURSO === "1") ||
                (d.BXAREC === 0 && d.HORARIO_CURSO === "0")
        ),

        // DPS Pagas (com horário definido)
        // resp2-curriculo: (BXAREC == 8 OU BXAREC == 9) && HORARIO_CURSO != 0
        paidWithSchedule: data.filter(
            d =>
                (d.BXAREC === 8 || d.BXAREC === 9) && d.HORARIO_CURSO !== "0"
        ),

        // Relação geral de DPS (restante)
        // resp3-curriculo:
        // - (BXAREC != 8 && HORARIO_CURSO == 0 && BXAREC != 0) OU
        // - ((BXAREC == 8 OU BXAREC == 9) && HORARIO_CURSO == 0)
        general: data.filter(
            d =>
                (d.BXAREC !== 8 && d.BXAREC !== 0 && d.HORARIO_CURSO === "0") ||
                ((d.BXAREC === 8 || d.BXAREC === 9) && d.HORARIO_CURSO === "0")
        ),
    };

    return (
        <StandardSubpage title="Requerimento de DPS">
            <div className="space-y-6">
                {remedialByStatus.availableForPayment.length > 0 && (
                    <div>
                        <AlertText text="Relação de DPS disponíveis para requerimento para esse semestre." />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            A matrícula nas disciplinas dependerá da oferta das mesmas no respectivo ano e semestre de matrícula e do deferimento do setor responsável.
                        </p>
                        {remedialByStatus.availableForPayment.map((item, index) => (
                            <AlertContainer key={`${item.IDDISC}-${index}-available`} className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                                <Flex className="justify-between items-center">
                                    <span className="text-gray-900 dark:text-white">
                                        {item.NMDISC} {item.IDDISC}
                                    </span>
                                    <Dialog key={`${item.IDDISC}-${index}-dialog`}>
                                        <DialogTrigger asChild>
                                            <Button variant={"outline"}>
                                                <CreditCard />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-full overflow-y-auto max-h-[80vh]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Atenção
                                                </DialogTitle>
                                                <div>
                                                    <p>
                                                        Estou ciente de que a disponibilização da disciplina na minha grade dependerá da ocorrência da mesma no corrente ano e semestre.
                                                    </p>
                                                    <Flex className="justify-end mt-4">
                                                        <Button onClick={() => { window.open(`https://services.unilago.edu.br/pagamento.php?l=${item.LANCREC}&c=${userData?.CD_MAT}`, "_blank") }}                                                        >
                                                            <CreditCard /> Pagar com cartão de crédito
                                                        </Button>
                                                        <Button onClick={() => { window.open(`https://services.unilago.edu.br/pixItau.php?action=pix&l=${item.LANCREC}&c=${userData?.CD_MAT}&r=${userData?.CD_MAT}`, "_blank") }}>
                                                            <ReceiptText /> Pagar via boleto
                                                        </Button>
                                                    </Flex>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </Flex>
                            </AlertContainer>
                        ))}
                    </div>
                )}

                {remedialByStatus.paidWithSchedule.length > 0 && (
                    <div>
                        <AlertText text="Relação de DPS Pagas." />
                        {remedialByStatus.paidWithSchedule.map((item) => (
                            <AlertContainer key={item.IDDISC + "-paid"} className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                                <span className="text-gray-900 dark:text-white">
                                    {item.NMDISC} {item.IDDISC}
                                </span>
                            </AlertContainer>
                        ))}
                    </div>
                )}

                {remedialByStatus.general.length > 0 && (
                    <div>
                        <AlertText text="Relação de DPS." />
                        {remedialByStatus.general.map((item) => {
                            const isPaid = item.BXAREC === 8 || item.BXAREC === 9;
                            return (
                                <AlertContainer
                                    key={item.IDDISC + "-general"}
                                    className={isPaid ? "bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700" : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"}
                                >
                                    <span className="text-gray-900 dark:text-white">
                                        {item.NMDISC} {item.IDDISC}
                                    </span>
                                </AlertContainer>
                            );
                        })}
                    </div>
                )}
            </div>
        </StandardSubpage>
    )
}