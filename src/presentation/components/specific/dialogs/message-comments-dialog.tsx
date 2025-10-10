import type { MessageDTO } from "@/application/dto/sent-message-dto";
import { useCommentsForm } from "@/presentation/hooks/use-comments-form";
import { useMessageComments } from "@/presentation/hooks/use-message-comments";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Form } from "../../ui/form";
import FormTextarea from "../../ui/form-textarea";
import { Skeleton } from "../../ui/skeleton";
import SubmitButton from "../../ui/submit-button";
import type { CommentsResponseDTO } from "@/application/dto/comments-response-dto";
import { useAuth } from "@/presentation/contexts/AuthContext";

export default function MessageCommentsDialog({ message }: { message: MessageDTO }) {
    const { data: comments, loading, refresh } = useMessageComments(message.COD_MENSAGEM);

    if (loading)
        return (
            <div>
                <Skeleton className="h-12 w-full" />
                <div className="flex justify-end mb-8 mt-4">
                    <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-32 w-full mb-8" />
            </div>
        )

    return (
        <>
            <FormSection refresh={refresh} message={message} />
            <CommentsSection comments={comments} />
        </>
    )
}

const FormSection = ({ refresh, message }: { refresh: () => void; message: MessageDTO }) => {
    const { form, handleSubmit } = useCommentsForm(message, refresh);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="mt-4">
                <FormTextarea
                    control={form.control}
                    label="Responder"
                    rows={5}
                    name="comment"
                />
                <div className="text-end mt-2">
                    <SubmitButton form={form} text="Enviar" Icon={Send} />
                </div>
            </form>
        </Form>
    )
}

const CommentsSection = ({ comments }: { comments: CommentsResponseDTO[] }) => {

    const { userData } = useAuth();

    return (
        <div className="space-y-2">
            {comments && comments.map((comment, index) => (
                <div
                    key={`${comment.CD_USUARIO}-${index}`}
                    className={`flex gap-2 sm:gap-4 flex-row border p-2 sm:p-4 rounded mb-2 ${comment.TIPO_USUARIO === 'P' ? 'bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-800' : 'bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-800'}`}
                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                    <div className="flex-shrink-0">
                        <Avatar className="transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            <AvatarImage src={`data:image/jpeg;base64,${comment.FOTO_ALUNO || comment.FOTO_PROF}`} />
                            <AvatarFallback>{userData?.NM_ALU.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                            <div>
                                <span className="text-xs sm:text-xs font-medium">
                                    {comment.TIPO_USUARIO === 'P' ? 'Professor(a)' : 'Aluno(a)'} {comment.NOME_USUARIO}
                                </span>
                                <span className="text-xs sm:text-xs text-gray-400 dark:text-white">
                                    - {new Date(comment.DATA).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                        <div className="w-full">
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-white break-words whitespace-pre-line w-full block" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                                {comment.DESCRICAO}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}