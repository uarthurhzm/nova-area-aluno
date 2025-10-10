import { EventService } from "@/domain/services/event-service";
import { useFetchData } from "./use-fetch-data";
import type { EventsResponseDTO } from "@/application/dto/events-response-dto";
import type { CoursesResponseDTO } from "@/application/dto/courses-response-dto";
import { format } from "date-fns";

export const useScheduleEvents = (selectedCourse: CoursesResponseDTO, date: Date) => {
    const { data, loading } = useFetchData<EventsResponseDTO, EventService>({
        methodName: selectedCourse ? "getEventsByCourse" : "getEventsByDate",
        ServiceClass: EventService,
        params: selectedCourse ? [selectedCourse.CD_CSO] : [date ? format(date, "yyyy-MM-dd") : ""],
    });

    return { data, loading };
}