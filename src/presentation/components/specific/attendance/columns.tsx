import type { GetStudentAttendanceRequestsResponseDTO } from "@/application/dto/attendance/get-student-attendance-requests-response-dto";
import { formatDate } from "@/presentation/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetStudentAttendanceRequestsResponseDTO>[] = [
    {
        accessorKey: "NUM_PROT",
        header: "Protocolo",
    },
    {
        accessorKey: "DT_ABERT",
        header: "Data do Requerimento",
        cell: ({ row }) => formatDate(row.original.DT_ABERT)
    },
    {
        accessorKey: "DESC_MOTIVO",
        header: "Motivo",

    },
]