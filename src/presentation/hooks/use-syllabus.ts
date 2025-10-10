import { StudentService } from "@/domain/services/student-service";
import { useFetchData } from "./use-fetch-data";
import type { StudentSyllabusResponseDTO } from "@/application/dto/student-syllabus-response-dto";
import { useAuth } from "../contexts/AuthContext";

export const useSyllabus = () => {

    const { userData } = useAuth();
    const { data, loading } = useFetchData<StudentSyllabusResponseDTO, StudentService>({
        ServiceClass: StudentService,
        methodName: "getStudentDisciplinesSyllabus",
        params: [userData?.CD_MAT]
    });

    return { data, loading };
}