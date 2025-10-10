import type { CoursesResponseDTO } from "@/application/dto/courses-response-dto";
import { columns } from "@/presentation/components/specific/events/columns";
import { Calendar } from "@/presentation/components/ui/calendar";
import { DataTable } from "@/presentation/components/ui/data-table";
import { Label } from "@/presentation/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import Flex from "../components/ui/flex";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useCourses } from "../hooks/use-courses";
import { useScheduleEvents } from "../hooks/use-schedule-events";

export default function SchedulePage() {
    const [searchBy, setSearchBy] = useState<"course" | "date">("date");
    const [showTable, setShowTable] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date());

    const [selectedCourse, setSelectedCourse] = useState<CoursesResponseDTO | null>(null);

    const { data: events, loading: loadingEvents } = useScheduleEvents(selectedCourse!, date!);
    const { data: courses, loading: loadingCourses } = useCourses();

    useEffect(() => {
        setShowTable(false);
        setSelectedCourse(null);
        setDate(searchBy === "date" ? new Date() : undefined);
    }, [searchBy])

    useEffect(() => {
        if (searchBy === "date" && !date) return;
        if (searchBy === "course" && !selectedCourse) return;
        setShowTable(true);


    }, [date, selectedCourse]);

    if (loadingEvents || loadingCourses)
        return (
            <StandardSubpage title="Calendário">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full rounded" />
                    <Flex>
                        {[...Array(2)].map((_, i) => (<Skeleton key={i} className="h-10 w-full rounded" />))}
                    </Flex>
                </div>
            </StandardSubpage>
        )

    return (
        <StandardSubpage title="Calendário">
            <div className="space-y-2">
                <Label className="text-lg font-semibold ">Tipo de busca</Label>
                <Select defaultValue={searchBy} onValueChange={(value) => setSearchBy(value as "course" | "date")}>
                    <SelectTrigger className="w-full ">
                        <SelectValue placeholder="SELECIONE" />
                    </SelectTrigger>
                    <SelectContent className="shadow-lg">
                        <SelectItem value="course"> Curso</SelectItem>
                        <SelectItem value="date">Data</SelectItem>
                    </SelectContent>
                </Select>

                {searchBy === "course" && (
                    <div className="space-y-2 mb-8">
                        <Label className="text-lg font-semibold">Curso</Label>
                        <Select onValueChange={(value) => setSelectedCourse(courses.find(course => course.CD_CSO === Number(value)) || null)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="SELECIONE" />
                            </SelectTrigger>
                            <SelectContent className="shadow-lg">
                                {courses.map(course => (
                                    <SelectItem key={course.CD_CSO} value={String(course.CD_CSO)}> {course.NM_CSO}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <Flex>
                    {searchBy === "date" && (
                        <div className="flex-shrink-0">
                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="w-fit"
                                    locale={ptBR}
                                />
                            </div>
                        </div>
                    )}
                    {showTable && <div className="w-full"><DataTable columns={columns} data={events} pagination={false} /></div>}
                </Flex>
            </div>
        </StandardSubpage>
    )
}