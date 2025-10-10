import type { StudentAbsencesResponseDTO } from "@/application/dto/student-absences-response-dto";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StudentAbsencesResponseDTO>[] = [
    {
        accessorKey: "NMDISC",
        header: "Disciplina",
        cell: ({ row }) => <>{row.original.NMDISC} ({row.original.CD_DISC})</>
    },
    {
        accessorKey: "JAN",
        header: "Jan",
    },
    {
        accessorKey: "FEV",
        header: "Fev",
    },
    {
        accessorKey: "MAR",
        header: "Mar",
    },
    {
        accessorKey: "ABR",
        header: "Abr",
    },
    {
        accessorKey: "MAI",
        header: "Mai",
    },
    {
        accessorKey: "JUN",
        header: "Jun",
    },
    {
        accessorKey: "JUL",
        header: "Jul",
    },
    {
        accessorKey: "AGO",
        header: "Ago",
    },
    {
        accessorKey: "SETEM",
        header: "Set",
    },
    {
        accessorKey: "OUT",
        header: "Out",
    },
    {
        accessorKey: "NOV",
        header: "Nov",
    },
    {
        accessorKey: "DEZ",
        header: "Dez",
    },
    {
        accessorKey: "TOTAL",
        header: "Total",
    },

]