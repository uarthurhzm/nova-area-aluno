import { columns } from "../components/specific/sent-messages/columns";
import { DataTable } from "../components/ui/data-table";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useSentMessages } from "../hooks/use-sent-messages";

export default function SentReceivedMessagesPage({ context }: { context: 'sent' | 'received' }) {

    const { data, loading } = useSentMessages(context);

    return (
        <StandardSubpage title="Caixa de Saída">
            {loading ? <Skeleton className="w-full h-24" /> : <DataTable columns={columns} data={data} />}
        </StandardSubpage>
    )
}