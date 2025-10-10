import type { EventsResponseDTO } from "@/application/dto/events-response-dto";
import type { AxiosInstance } from "axios";

export class EventRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getEventsByDate(date: string): Promise<EventsResponseDTO[]> {
        const response = await this.api.get(`/events`, { params: { date } });
        return response.data;
    }

    async getEventsByCourse(courseId: number): Promise<EventsResponseDTO[]> {
        const response = await this.api.get(`/events`, { params: { courseId } });
        return response.data;
    }
}