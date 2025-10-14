import type { StudentEnrollmentCertificatesResponseDTO } from "@/application/dto/student-enrollment-certificates-response-dto";
import type { UserEntity } from "@/domain/entities/user-entity";
import { formatDate } from "@/presentation/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, CreditCard, ReceiptText } from "lucide-react";
import Flex from "../../ui/flex";
import GridActionButton from "../../ui/GridActionButton";
import { Pix } from "../../ui/pix";

export const createColumns = (userData: UserEntity): ColumnDef<StudentEnrollmentCertificatesResponseDTO>[] => [
    {
        accessorKey: "NUM_PROT",
        header: "Protocolo",
    },
    {
        accessorKey: "CD_BXAREC",
        header: "Tipo",
        cell: ({ }) => "Atestado Matricula"
    },
    {
        accessorKey: "DT_INSC",
        header: "Data de Solicitação",
        cell: ({ row }) => formatDate(row.original.DT_INSC),
    },
    {
        accessorKey: "DT_PAGO",
        header: "Data de Pagamento",
        cell: ({ row }) => formatDate(row.original.DT_PAGO),
    },
    {
        accessorKey: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const certificate = row.original;
            return (
                <Flex>
                    {certificate.CD_BXAREC === 0 ? (
                        <>
                            <GridActionButton icon={Pix} label="Pagar via Pix" onClick={() => {
                                window.open('https://services.unilago.edu.br/pixItau.php?action=pix&l=' + certificate.CD_LANCREC + '&c=' + userData.CD_MAT.toString().trim() + '&r=' + userData.CD_MAT.toString().trim())
                            }} />
                            <GridActionButton icon={CreditCard} label="Pagar com Cartão de Crédito" onClick={() => {
                                window.open('https://services.unilago.edu.br/pagamento.php?l=' + certificate.CD_LANCREC + '&c=' + userData.CD_MAT.toString().trim())
                            }} />
                            <GridActionButton icon={ReceiptText} label="Pagar via Boleto" onClick={() => {
                                window.open('https://pagamentos.unilago.edu.br/itau/boleto-integrado.php?l=' + certificate.CD_LANCREC + '&c=' + userData.CD_MAT.toString().trim() + '&f=' + userData.CD_MAT.toString().trim())
                            }} />
                        </>
                    ) : (
                        <GridActionButton icon={Check} label="Pago" onClick={() => { }} />
                    )}

                </Flex >
            )
        },
    },
]