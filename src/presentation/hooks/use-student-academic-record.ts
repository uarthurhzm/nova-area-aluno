import type { StudentAcademicRecordResponseDTO } from "@/application/dto/student-academic-record-response-dto";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";
import { SecretaryService } from "@/domain/services/secretary-service";
import { useRefreshData } from "./use-refresh-data";

export const useStudentAcademicRecord = () => {
    const { userData } = useAuth();
    const { refreshKey, refresh } = useRefreshData();
    const { data, loading } = useFetchData<StudentAcademicRecordResponseDTO, SecretaryService>(
        {
            ServiceClass: SecretaryService,
            methodName: "getStudentAcademicRecords",
            params: [userData?.CD_MAT, refreshKey]
        }
    );

    return { data, loading, refresh }
}