import { Calendar, CloudDownload } from "lucide-react";
import { CALENDAR_URL } from "./calendar-url";

export const DOWNLOADS = [
    {
        name: "Calendário Acadêmico",
        icon: Calendar,
        url: CALENDAR_URL
    },
    {
        name: "Logotipo da Instituição",
        icon: CloudDownload,
        url: "https://apps.unilago.edu.br/img/logo_UNILAGO_Transparente.png"
    },
    {
        name: "Firefox",
        icon: CloudDownload,
        url: "https://www.firefox.com/pt-BR/"
    },
    {
        name: "Google Chrome",
        icon: CloudDownload,
        url: "https://www.google.com/intl/pt-BR/chrome/"
    },
    {
        name: "Programa para visualização e impressão de arquivos em Formato PDF",
        icon: CloudDownload,
        url: "https://www.foxit.com/pdf-reader/"
    },
]