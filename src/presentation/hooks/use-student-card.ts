import { StudentService } from "@/domain/services/student-service";
import { useFetchData } from "./use-fetch-data";
import type { StudentCardResponseDTO } from "@/application/dto/student-card-response-dto";
import { useAuth } from "../contexts/AuthContext";

export const useStudentCard = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<StudentCardResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentCard",
            params: [userData?.CD_MAT]
        }
    );

    return { data: Array.isArray(data) ? data[0] : data, loading }
}