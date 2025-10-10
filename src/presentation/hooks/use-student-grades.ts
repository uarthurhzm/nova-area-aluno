import { StudentService } from "@/domain/services/student-service";
import { useFetchData } from "./use-fetch-data";
import type { StudentGradesResponseDTO } from "@/application/dto/student-grades-response-dto";
import { useAuth } from "../contexts/AuthContext";

export const useStudentGrades = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<StudentGradesResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentGrades",
            params: [userData?.CD_MAT]
        }
    );

    return { data, loading };
}