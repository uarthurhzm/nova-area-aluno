import { StudentService } from "@/domain/services/student-service";
import { useFetchData } from "./use-fetch-data";
import { useAuth } from "../contexts/AuthContext";
import type { StudentDisciplinesResponseDTO } from "@/application/dto/student-disciplines-response-dto";

export const useStudentDisciplines = () => {
    const { userData } = useAuth();


    const { data, loading } = useFetchData<StudentDisciplinesResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentDisciplines",
            params: [userData]
        }
    );

    return { data, loading };
}