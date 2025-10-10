import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, type SortingState, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "./button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination?: boolean;
}

export function DataTable<TData, TValue>({ columns, data, pagination = true }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onSortingChange: setSorting,
            getSortedRowModel: getSortedRowModel(),
            state: {
                sorting
            }
        });

    return (
        <div>
            <div className="w-full max-w-full overflow-hidden">
                <div className="overflow-x-auto overflow-y-auto max-h-128 rounded-md border w-full sticky-scroll">
                    <Table className="w-full">
                        <TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-950">
                            {table.getHeaderGroups().map((hg) => (
                                <TableRow key={hg.id}>
                                    {hg.headers.map((h) => (
                                        <TableHead
                                            key={h.id}
                                            className="whitespace-nowrap"
                                            style={{ width: "1px", whiteSpace: "nowrap" }}
                                        >
                                            {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((r) => (
                                    <TableRow key={r.id} data-state={r.getIsSelected() && "selected"}>
                                        {r.getVisibleCells().map((c) => (
                                            <TableCell
                                                key={c.id}
                                                className="whitespace-nowrap"
                                                style={{ width: "1px", whiteSpace: "nowrap" }}
                                            >
                                                {flexRender(c.column.columnDef.cell, c.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center">
                                        Nenhum registro encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {pagination && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant={"outline"}
                        size={'sm'}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant={"outline"}
                        size={'sm'}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próximo
                    </Button>
                </div>
            )}
        </div>
    )
}