import type { UserEntity } from "@/domain/entities/user-entity";
import billet_aems from '@/shared/assets/images/billets/aviso-boleto-aems.jpg';
import billet_unilago from '@/shared/assets/images/billets/aviso-boleto.jpg';
import { CreditCard } from "lucide-react";
import { columns, expandTicketData } from "../components/specific/billet/columns";
import AlertText from "../components/ui/alert-text";
import { Button } from "../components/ui/button";
import { DataTable } from "../components/ui/data-table";
import Flex from "../components/ui/flex";
import { Pix } from "../components/ui/pix";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useAuth } from "../contexts/AuthContext";
import { useTicket } from "../hooks/use-ticket";

export default function BilletPage() {

    const { data, loading } = useTicket();
    const { userData } = useAuth();

    if (loading) {
        return (
            <StandardSubpage title="Pagar: Boleto / Cartão / Pix">
                <Skeleton className="h-24 w-full rounded mb-8" />
                <Flex className="justify-end mb-8">
                    <Skeleton className="h-10 w-32 rounded mr-2" />
                    <Skeleton className="h-10 w-32 rounded" />
                </Flex>
                <Skeleton className="h-24 w-full rounded" />
            </StandardSubpage>
        )
    }

    const expandedData = data ? expandTicketData(data) : [];

    return (
        <StandardSubpage title="Pagar: Boleto / Cartão / Pix">
            {((!!data && (data.MENS_QUITADAS == "NAO" && data.EMITIR_BOLETO == "NAO")) || !data) && (
                <>
                    <p className="muted text-red-700">
                        Há uma pendência em seu cadastro. Para solicitar o boleto bancário, envie um e-mail para <a className="text-blue-600 underline"
                            href={`mailto:boletobancario@${userData?.CD_EMP === 10 ? 'aems' : 'unilago'}.edu.br?Subject=Solicitação de Boleto`}>boletobancario@unilago.edu.br</a> informando seu nome completo, RA e CPF.
                    </p>
                    <BilletImage userData={userData!} />
                </>
            )}

            {!!data && data.MENS_QUITADAS === "NAO" && (
                <>
                    <DataTable columns={columns} data={expandedData} pagination={false} />
                    <Flex className="mt-4 mb-4 justify-end">
                        <Button onClick={() => { window.open(`https://services.unilago.edu.br/pixItau.php?action=pix&l=${data?.CD_LANCREC}&c=${userData!.CD_MAT.toString().trim()}&r=${userData!.CD_MAT}`, '_blank'); }}>
                            <Pix /> Pagamento via Boleto/Pix
                        </Button>
                        <Button onClick={() => { window.open(`https://services.unilago.edu.br/pagamento.php?l=${data.CD_LANCREC}&c=${userData!.CD_MAT.toString().trim()}&r=${userData!.CD_MAT}`, '_blank'); }}>
                            <CreditCard /> Pagamento via Cartão
                        </Button>
                    </Flex>
                    <BilletImage userData={userData!} />
                    <AlertText text="Importante:" /> O pagamento pelo boleto bancário não comprova a total isenção de débito com a faculdade. O boleto bancário é um mero instrumento que busca atender e facilitar o desenvolvimento ágil e veloz das relações entre aluno e faculdade.
                </>
            )}
        </StandardSubpage >
    )
}

const BilletImage = ({ userData }: { userData: UserEntity }) => {
    return (
        <div className="flex justify-center mb-4">
            <img src={userData?.CD_EMP === 10 ? billet_aems : billet_unilago} />
        </div>
    )
}