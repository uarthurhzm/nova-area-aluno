import type { PageItemsProps } from "@/shared/types/common-types";
import { PAGE_ITEMS } from "@/shared/constants/page-options";
import { useEffect, useState } from "react";
import OptionsCard, { type OptionsCardOption } from "./options-card";
import { TopicTitle } from "./topic-title";

export default function PageOptions() {
    const [items, setItems] = useState<PageItemsProps | undefined>();

    useEffect(() => {
        const item = PAGE_ITEMS.find(i => window.location.pathname.includes(i.route));
        if (!item)
            throw new Error("Rota não encontrada");

        setItems(item);
    }, [])

    return (
        <>
            {items && (
                <div>
                    {/* Colocando um título geral para manter o padrão */}
                    {items.options.some(option => !option.subOptions && option.route) && (<TopicTitle title="Opções Gerais" />)}
                    {/* Cards dos itens que não possuem sub-opções */}
                    <CardContainer options={items.options.filter(option => !option.subOptions && option.route) as OptionsCardOption[]} />
                    {/* Cards dos itens que possuem sub-opções     */}
                    {items.options.map((option, index) => {
                        if (option.subOptions) {
                            return (
                                <div key={index} className='space-y-4 mb-8'>
                                    <TopicTitle title={option.name} />
                                    <CardContainer options={option.subOptions as OptionsCardOption[]} />
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </>
    )
}

const CardContainer = ({ options }: { options: OptionsCardOption[] }) => (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4'>
        <OptionsCard options={options} />
    </div>
)