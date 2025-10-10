import { createColumns } from "@/presentation/components/specific/book-devolution/columns";
import AlertContainer from "@/presentation/components/ui/alert-container";
import AlertText from "@/presentation/components/ui/alert-text";
import { DataTable } from "@/presentation/components/ui/data-table";
import { TopicTitle } from "@/presentation/components/ui/topic-title";
import StandardSubpage from "../components/ui/standart-subpage";
import { useLoanedBooks } from "../hooks/use-loaned-books";
import { Skeleton } from "../components/ui/skeleton";
import { useLibraryService } from "../hooks/use-library-service";

export default function BookRenewalPage() {

    const { data: loanedBooks, loading: loadingLoanedBooks, refresh: refreshLoanedBooks } = useLoanedBooks('now');
    const { data: previousLoanedBooks, loading: loadingPreviousLoanedBooks, refresh: refreshPreviousLoanedBooks } = useLoanedBooks('previous');
    const libraryService = useLibraryService();

    const columns = createColumns({
        onRenew: async (book) => {
            await libraryService.renewBook(book.SEQ_EPR);
            refreshLoanedBooks();
            refreshPreviousLoanedBooks();
        },
        onProof: (book) => {
            window.open(`https://apps.unilago.edu.br/aluno/biblioteca/comprovante/${book.SEQ_EPR}`, '_blank');
        }
    });

    if (loadingLoanedBooks || loadingPreviousLoanedBooks) {
        return (
            <StandardSubpage title="Renovação">
                <Skeleton className="h-12 w-full mt-8 mb-8" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full mt-8" />
            </StandardSubpage>
        )
    }

    return (
        <StandardSubpage title="Renovação">
            <AlertContainer>
                <AlertText text="Atenção: " /> <br />
                <p>O livro só poderá ser renovado até a data de devolução.</p>
                <p>A renovação só poderá ser feita uma vez pela área do aluno ou presencial na biblioteca, caso o livro não tenha reserva.</p>
            </AlertContainer>
            <div className="space-y-4 mt-4">
                <TopicTitle title="Acervos Emprestados" />
                <DataTable columns={columns} data={loanedBooks} pagination={false} />
                <TopicTitle title="Empréstimos Anteriores" />
                <DataTable columns={columns.slice(0, -1)} data={previousLoanedBooks} pagination={false} />
            </div>
        </StandardSubpage>
    )
}