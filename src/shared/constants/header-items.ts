import { ROUTES } from "@/shared/constants/router";

import type { HeaderItemProps } from "@/shared/types/common-types";
import { Book, File, Folder, House, Mail, User, UserRoundSearch } from "lucide-react";


export const HEADER_ITEMS: HeaderItemProps[] = [
    {
        name: "Início",
        icon: House,
        route: ROUTES.home,
    },
    {
        name: "Estudos",
        icon: Folder,
        route: ROUTES.student,
    },
    {
        name: "Atendimento",
        icon: UserRoundSearch,
        route: ROUTES.service,
    },
    {
        name: "Biblioteca",
        icon: Book,
        route: ROUTES.library,
    },
    {
        name: "Mensagens",
        icon: Mail,
        route: ROUTES.messages,
    },
    {
        name: "Perfil",
        icon: User,
        route: ROUTES.profile,
    },
    {
        name: "CPA",
        icon: File,
        route: ROUTES.cpa,
    }
]