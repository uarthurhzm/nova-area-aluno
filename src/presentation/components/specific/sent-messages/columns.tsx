import type { MessageDTO } from "@/application/dto/sent-message-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import MessageCommentsDialog from "../dialogs/message-comments-dialog";


const Content = ({ message }: { message: MessageDTO }) => {
    return (
        <>
            {new Date(message.DATA).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                year: 'numeric'
            })} - {message.ASSUNTO}
        </>
    )
}

export const columns: ColumnDef<MessageDTO>[] = [
    {
        accessorKey: "NOME",
        header: "Título",
        cell: ({ row }) => {
            const message = row.original;
            return (
                <Dialog key={message.COD_MENSAGEM}>
                    <DialogTrigger>
                        <Content message={message} /> <small>Professor(a) {message.NOME}</small>
                    </DialogTrigger>
                    <DialogContent className="overflow-y-auto max-h-[80vh]">
                        <DialogHeader>
                            <DialogTitle><Content message={message} /></DialogTitle>
                            <MessageCommentsDialog message={message} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )
        }
    },
]