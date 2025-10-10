import type { StudentProfessorsResponseDTO } from "@/application/dto/student-professors-response-dto";
import { useFetchData } from "./use-fetch-data";
import { StudentService } from "@/domain/services/student-service";
import { useAuth } from "../contexts/AuthContext";

export const useStudentProfessors = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<StudentProfessorsResponseDTO, StudentService>({
        ServiceClass: StudentService,
        methodName: "getStudentProfessors",
        params: [userData],
    });

    return { data, loading };
}