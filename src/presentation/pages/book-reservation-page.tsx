import { columns } from "@/presentation/components/specific/book-reservation/columns";
import Column from "@/presentation/components/ui/Column";
import { DataTable } from "@/presentation/components/ui/data-table";
import Flex from "@/presentation/components/ui/flex";
import { Form } from "@/presentation/components/ui/form";
import FormInput from "@/presentation/components/ui/form-input";
import FormSelect from "@/presentation/components/ui/form-select";
import SubmitButton from "@/presentation/components/ui/submit-button";
import { TopicTitle } from "@/presentation/components/ui/topic-title";
import { BOOK_SEARCH_OPTIONS, MEDIA_FORMAT_OPTIONS } from "@/shared/constants/book-search-options";
import { Search } from "lucide-react";
import StandardSubpage from "../components/ui/standart-subpage";
import { useBookSearchForm } from "../hooks/use-book-search-form";

export default function BookReservationPage() {

    const { form, handleSubmit, results } = useBookSearchForm();
    
    return (
        <StandardSubpage title="Consulta e Reserva" withSpace={true}>
            <p><b>Obs:</b> Agora você pode fazer reserva de livros, ao realizar uma consulta você poderá clicar no "livro" desejado será exibido uma lista com seus exemplares, se todos os exemplares estiverem emprestado, você poderá clicar nele e automaticamente o livro será reservado para você.</p>
            <TopicTitle title="Consulta de Acervo" />
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Flex>
                        <Column size={4}>
                            <FormSelect
                                control={form.control}
                                name="searchOption"
                                label="Tipo de Pesquisa"
                                options={BOOK_SEARCH_OPTIONS}
                            />
                        </Column>
                        <Column size={4}>
                            <FormSelect
                                control={form.control}
                                name="mediaOption"
                                label="Formato de Mídia"
                                options={MEDIA_FORMAT_OPTIONS}
                            />
                        </Column>
                        <Column size={4}>
                            <div className="w-full flex items-start flex-col md:flex-row">
                                <FormInput
                                    control={form.control}
                                    name="searchQuery"
                                    label="Termo de Pesquisa"
                                    placeholder="Digite o termo de pesquisa"
                                    className="md:[&_input]:rounded-r-none w-full"
                                />
                                <SubmitButton form={form} text="Buscar" Icon={Search} className="mt-5.5 md:rounded-l-none w-full md:w-auto md:mt-5.5" />
                            </div>
                        </Column>
                    </Flex>
                </form>
            </Form>
            {results.length > 0 && <DataTable columns={columns} data={results} />}
        </StandardSubpage>
    )
}