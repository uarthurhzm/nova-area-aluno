import type { StudentSubstituteDisciplinesResponseDTO } from "@/application/dto/student-dp-disciplines-response-dto";
import { StudentService } from "@/domain/services/student-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";
import { useRefreshData } from "./use-refresh-data";

export const useStudentSubstituteDisciplines = () => {
    const { userData } = useAuth();
    const { refresh, refreshKey } = useRefreshData();

    const { data, loading } = useFetchData<StudentSubstituteDisciplinesResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentSubstituteDisciplines",
            params: [userData?.CD_MAT, refreshKey]
        }
    );

    return { data, loading, refresh };
}