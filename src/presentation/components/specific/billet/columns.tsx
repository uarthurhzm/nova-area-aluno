import type { TicketResponseDTO } from "@/application/dto/ticket-response-dto";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/presentation/utils/format-date";

type BilletRow = {
    CD_LANCREC: string;
    VAL_REC: number;
    desconto: number;
    dataVencimento: string;
    totalPagar: number;
    opcao: number;
};

export const expandTicketData = (ticket: TicketResponseDTO): BilletRow[] => {
    const rows: BilletRow[] = [];

    for (let x = 1; x <= 3; x++) {
        const dataVencimento = ticket[`DATA${x}_DESC` as keyof TicketResponseDTO] as string;
        const desconto = ticket[`VALOR_TOT_DESC${x}` as keyof TicketResponseDTO] as number;

        if (dataVencimento && ticket.VAL_REC) {
            rows.push({
                CD_LANCREC: ticket.CD_LANCREC,
                VAL_REC: ticket.VAL_REC,
                desconto: desconto || 0,
                dataVencimento: dataVencimento,
                totalPagar: ticket.VAL_REC - (desconto || 0),
                opcao: x
            });
        }
    }

    return rows;
};

export const columns: ColumnDef<BilletRow>[] = [
    {
        accessorKey: "CD_LANCREC",
        header: "Num. Doc",
    },
    {
        accessorKey: "VAL_REC",
        header: "Valor Mensalidade",
        cell: ({ getValue }) => {
            const value = getValue() as number;
            return 'R$' + value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    },
    {
        accessorKey: "desconto",
        header: "Desconto",
        cell: ({ getValue }) => {
            const value = getValue() as number;
            return 'R$' + value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    },
    {
        accessorKey: "dataVencimento",
        header: "Data Vencimento",
        cell: ({ getValue }) => {
            const value = getValue() as string;
            return formatDate(value);
        }
    },
    {
        accessorKey: "totalPagar",
        header: "Total a pagar",
        cell: ({ getValue }) => {
            const value = getValue() as number;
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    },
];