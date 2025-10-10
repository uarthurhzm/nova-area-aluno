import type { OpportunityResponseDTO } from "@/application/dto/opportunity-response-dto";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OpportunityResponseDTO>[] = [
    {
        accessorKey: "nomefantasia",
        header: "Empresa",
        cell: ({ row }) => {
            const opportunity = row.original;
            return (
                <div>
                    <p className="text-muted-foreground">
                        <strong>{opportunity.nomefantasia} </strong>
                        {opportunity.contatoestagio}
                        <strong>{opportunity.tipo}</strong>
                    </p>
                    {opportunity.cargooferecido}, {opportunity.duracao}
                </div>
            );
        }
    },
]