import { SecretaryService } from "@/domain/services/secretary-service";
import { useFetchData } from "./use-fetch-data";
import type { StudentSubstituteExamResponseDTO } from "@/application/dto/student-substitute-exam-response-dto";
import { useAuth } from "../contexts/AuthContext";
import { useRefreshData } from "./use-refresh-data";

export const useStudentSubstituteExam = () => {
    const { userData } = useAuth();
    const { refresh, refreshKey } = useRefreshData();
    const { data, loading } = useFetchData<StudentSubstituteExamResponseDTO, SecretaryService>(
        {
            ServiceClass: SecretaryService,
            methodName: "getStudentSubstituteExams",
            params: [userData?.CD_MAT, refreshKey],
        }
    );

    return { data, loading, refresh };
}