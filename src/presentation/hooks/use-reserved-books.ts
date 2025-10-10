import type { StudentReservedBook } from "@/application/dto/student-reserved-book";
import { LibraryService } from "@/domain/services/library-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";
import { useRefreshData } from "./use-refresh-data";

export const useReservedBooks = () => {
    const { userData } = useAuth();
    const { refreshKey, refresh } = useRefreshData();

    const { data, loading } = useFetchData<StudentReservedBook, LibraryService>(
        {
            ServiceClass: LibraryService,
            methodName: "getReservedBooksByStudent",
            params: [userData?.CD_MAT, refreshKey]
        }
    );

    return { data, loading, refresh };
}