import type { StudentEnrollmentCertificatesResponseDTO } from "@/application/dto/student-enrollment-certificates-response-dto";
import { useFetchData } from "./use-fetch-data";
import { SecretaryService } from "@/domain/services/secretary-service";
import { useAuth } from "../contexts/AuthContext";
import { useRefreshData } from "./use-refresh-data";

export const useStudentEnrollmentCertificates = () => {
    const { userData } = useAuth();
    const { refreshKey, refresh } = useRefreshData();
    const { data, loading } = useFetchData<StudentEnrollmentCertificatesResponseDTO, SecretaryService>(
        {
            ServiceClass: SecretaryService,
            methodName: "getStudentEnrollmentCertificates",
            params: [userData?.CD_MAT, refreshKey]
        }
    );

    return { data, loading, refresh };
}