import type { StudentListenerMeetingResponseDTO } from "@/application/dto/student-listener-meeting-response-dto";
import { StudentService } from "@/domain/services/student-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";

export const useStudentListenerCertificates = () => {
    const { userData } = useAuth();

    const { data, loading } = useFetchData<StudentListenerMeetingResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentListenerMeetingCertificates",
            params: [userData?.CD_MAT],
        }
    );

    return { data, loading };
}