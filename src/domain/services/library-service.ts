import type { BookDetailsResponseDTO } from "@/application/dto/book-details-response-dto";
import type { LibraryCollectionsResponseDTO } from "@/application/dto/library-collections-response-dto";
import type { LoanedBookResponseDTO } from "@/application/dto/loaned-book-response-dto";
import type { PostReserveDTO } from "@/application/dto/post-reserve-dto";
import type { StudentReservedBook } from "@/application/dto/student-reserved-book";
import type { BOOK_SEARCH_SCHEMA } from "@/presentation/schemas/schemas";
import type { AxiosInstance } from "axios";
import type z from "zod";
import { LibraryRepository } from "../repositories/library-repository";

export class LibraryService {
    private libraryRepository: LibraryRepository;

    constructor(api: AxiosInstance) {
        this.libraryRepository = new LibraryRepository(api);
    }

    async getAllCollections(data: z.infer<typeof BOOK_SEARCH_SCHEMA>): Promise<LibraryCollectionsResponseDTO[]> {
        return await this.libraryRepository.getAllCollections(data);
    }

    async getBookDetails(id: number): Promise<BookDetailsResponseDTO> {
        return await this.libraryRepository.getBookDetails(id);
    }

    async getLoanedBooksByStudent(cd_mat: number, context: string): Promise<LoanedBookResponseDTO[]> {
        return await this.libraryRepository.getLoanedBooksByStudent(cd_mat, context);
    }

    async postReserve(data: PostReserveDTO): Promise<void> {
        return await this.libraryRepository.postReserve(data);
    }

    async getReservedBooksByStudent(cd_mat: number): Promise<StudentReservedBook[]> {
        return await this.libraryRepository.getReservedBooksByStudent(cd_mat);
    }

    async cancelReservation(id: number): Promise<void> {
        return await this.libraryRepository.cancelReservation(id);
    }

    async renewBook(seq_epr: number): Promise<void> {
        return await this.libraryRepository.renewBook(seq_epr);
    }

}