import type { StudentAcademicWeekResponseDTO } from "@/application/dto/student-academic-week-response-dto";
import { StudentService } from "@/domain/services/student-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";

export const useStudentAcademicWeek = () => {
    const { userData } = useAuth();

    const { data, loading } = useFetchData<StudentAcademicWeekResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentAcademicWeekCertificates",
            params: [userData?.LOGIN],
        }
    );

    return { data, loading };
}