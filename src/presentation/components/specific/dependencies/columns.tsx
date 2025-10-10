import type { DependencyProps } from "@/shared/types/common-types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DependencyProps>[] = [
    {
        accessorKey: "discipline",
        header: "Disciplina",
        cell: ({ row }) => {
            const grade = row.original;
            return `${grade.code} - ${grade.discipline}`;
        },
    },
]