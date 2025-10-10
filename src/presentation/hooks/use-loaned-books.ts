import { LibraryService } from "@/domain/services/library-service";
import { useFetchData } from "./use-fetch-data";
import type { LoanedBookResponseDTO } from "@/application/dto/loaned-book-response-dto";
import { useAuth } from "../contexts/AuthContext";
import { useRefreshData } from "./use-refresh-data";

export const useLoanedBooks = (context: 'now' | 'previous') => {
    const { userData } = useAuth();
    const { refresh, refreshKey } = useRefreshData();
    const { data, loading } = useFetchData<LoanedBookResponseDTO, LibraryService>(
        {
            ServiceClass: LibraryService,
            methodName: "getLoanedBooksByStudent",
            params: [userData?.CD_MAT, context, refreshKey]
        }
    );

    return { data, loading, refresh };
}