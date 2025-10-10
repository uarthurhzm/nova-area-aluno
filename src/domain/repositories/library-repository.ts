import type { BookDetailsResponseDTO } from "@/application/dto/book-details-response-dto";
import type { LibraryCollectionsResponseDTO } from "@/application/dto/library-collections-response-dto";
import type { LoanedBookResponseDTO } from "@/application/dto/loaned-book-response-dto";
import type { PostReserveDTO } from "@/application/dto/post-reserve-dto";
import type { StudentReservedBook } from "@/application/dto/student-reserved-book";
import type { BOOK_SEARCH_SCHEMA } from "@/presentation/schemas/schemas";
import type { AxiosInstance } from "axios";
import type z from "zod";

export class LibraryRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getAllCollections(data: z.infer<typeof BOOK_SEARCH_SCHEMA>): Promise<LibraryCollectionsResponseDTO[]> {
        const response = await this.api.get<LibraryCollectionsResponseDTO[]>("/library/collections", { params: data });
        return response.data;
    }

    async getBookDetails(id: number): Promise<BookDetailsResponseDTO> {
        const response = await this.api.get<BookDetailsResponseDTO>(`/library/collections/${id}`);
        return response.data;
    }

    async getLoanedBooksByStudent(cd_mat: number, context: string): Promise<LoanedBookResponseDTO[]> {
        const response = await this.api.get<LoanedBookResponseDTO[]>(`/library/loaned-books/${cd_mat.toString().trim()}`, {
            params: {
                context
            }
        });
        return response.data;
    }

    async postReserve(data: PostReserveDTO): Promise<void> {
        await this.api.post("/library/reserve-book", data);
    }

    async getReservedBooksByStudent(cd_mat: number): Promise<StudentReservedBook[]> {
        const response = await this.api.get<StudentReservedBook[]>(`/library/reserved-books/${cd_mat.toString().trim()}`);
        return response.data;
    }

    async cancelReservation(id: number): Promise<void> {
        await this.api.delete(`/library/cancel-reservation/${id.toString().trim()}`);
    }

    async renewBook(seq_epr: number): Promise<void> {
        await this.api.post(`/library/renew-book/${seq_epr.toString().trim()}`);
    }
}