import type { LucideIcon } from "lucide-react";

type ItemsSuboptionsProps = {
    name: string;
    image: string;
    route: string;
    description?: string;
    gradient?: string;
}

export type PageSubitemsProps = {
    name: string;
    image: string;
    route?: string;
    description?: string;
    gradient?: string;
    subOptions?: ItemsSuboptionsProps[];
}

export type PageItemsProps = {
    route: string;
    options: PageSubitemsProps[];
}

export type HeaderItemName = "Início" | "Estudos" | "Atendimento" | "Biblioteca" | "Mensagens" | "Perfil" | "CPA";

export type HeaderItemProps = {
    name: HeaderItemName;
    icon: LucideIcon;
    route: string
}


export type NoticeProps = {
    id: number;
    user: string;
    priority: string;
    title: string;
    content: string;
    date: string;
}

export type DependencyProps = {
    id: number;
    code: string;
    discipline: string;
}