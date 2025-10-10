import type { StudentSubstituteExamResponseDTO } from "@/application/dto/student-substitute-exam-response-dto";
import type { UserEntity } from "@/domain/entities/user-entity";
import { formatDate } from "@/presentation/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { CreditCard, Trash } from "lucide-react";
import Flex from "../../ui/flex";
import GridActionButton from "../../ui/GridActionButton";
import { Pix } from "../../ui/pix";

interface ColumnsProps {
    userData: UserEntity;
    onDelete: (protocol: number) => Promise<void>;
}

export const createColumns = ({ userData, onDelete }: ColumnsProps): ColumnDef<StudentSubstituteExamResponseDTO>[] => [

    {
        accessorKey: "NM_DISC",
        header: "Disciplina",
    },
    {
        accessorKey: "DT_ABERT",
        header: "Data",
        cell: ({ row }) => formatDate(row.original.DT_ABERT),
    },
    {
        accessorKey: "DESC_MENS",
        header: "Situação",
    },
    {
        accessorKey: "",
        header: "Ações",
        cell: ({ row }) => {
            const document = row.original;
            return (
                <Flex>
                    <GridActionButton
                        icon={Trash}
                        label="Cancelar Requerimento"
                        onClick={async () => {
                            try {
                                await onDelete(document.NUM_PROT);
                            } catch (error) {
                                console.error("Error deleting activity:", error);
                            }
                        }}
                        variant="destructive"
                    />
                    <GridActionButton icon={Pix} label="Pagar via Pix" onClick={() => {
                        window.open('https://services.unilago.edu.br/pixItau.php?action=pix&l=' + row.original.CD_LANCREC + '&c=' + userData.CD_MAT.toString().trim() + '&r=' + userData.CD_MAT.toString().trim())
                    }} />
                    <GridActionButton icon={CreditCard} label="Pagar com Cartão de Crédito" onClick={() => {
                        window.open('https://services.unilago.edu.br/pagamento.php?l=' + row.original.CD_LANCREC + '&c=' + userData.CD_MAT.toString().trim())
                    }} />
                </Flex >
            )
        },
    }
]