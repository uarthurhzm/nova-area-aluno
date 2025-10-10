import type { EventsResponseDTO } from "@/application/dto/events-response-dto";
import type { AxiosInstance } from "axios";
import { EventRepository } from "../repositories/event-repository";

export class EventService {
    private eventsRepository: EventRepository;

    constructor(api: AxiosInstance) {
        this.eventsRepository = new EventRepository(api);
    }

    async getEventsByDate(date: string): Promise<EventsResponseDTO[]> {
        if (!date) return [];
        return await this.eventsRepository.getEventsByDate(date);
    }

    async getEventsByCourse(courseId: number): Promise<EventsResponseDTO[]> {
        if (!courseId) return [];
        return await this.eventsRepository.getEventsByCourse(courseId);
    }

}