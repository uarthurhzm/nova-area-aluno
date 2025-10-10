import type { LibraryCollectionsResponseDTO } from "@/application/dto/library-collections-response-dto";
import { useFetchData } from "./use-fetch-data";
import type { BookDetailsResponseDTO } from "@/application/dto/book-details-response-dto";
import { LibraryService } from "@/domain/services/library-service";

export const useBookDetails = (book: LibraryCollectionsResponseDTO) => {
    const { data, loading } = useFetchData<BookDetailsResponseDTO, LibraryService>(
        {
            ServiceClass: LibraryService,
            methodName: "getBookDetails",
            params: [book.CD_ACV]
        }
    );

    return { data, loading };
}