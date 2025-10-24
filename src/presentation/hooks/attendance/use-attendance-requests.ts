import type { GetStudentAttendanceRequestsResponseDTO } from "@/application/dto/attendance/get-student-attendance-requests-response-dto";
import { SecretaryService } from "@/domain/services/secretary-service";
import { useFetchData } from "../use-fetch-data";
import { useAuth } from "@/presentation/contexts/AuthContext";

export const useAttendanceRequests = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<GetStudentAttendanceRequestsResponseDTO, SecretaryService>(
        {
            ServiceClass: SecretaryService,
            methodName: "getStudentAttendanceRequests",
            params: [userData?.CD_ALU]
        }
    );

    return { data, loading };
}