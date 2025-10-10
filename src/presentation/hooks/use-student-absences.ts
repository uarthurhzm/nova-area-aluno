import type { StudentAbsencesResponseDTO } from "@/application/dto/student-absences-response-dto";
import { StudentService } from "@/domain/services/student-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";

export const useStudentAbsences = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<StudentAbsencesResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentAbsences",
            params: [userData?.CD_MAT]
        }
    );

    return { data, loading };
}