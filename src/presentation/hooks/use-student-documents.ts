import { StudentService } from "@/domain/services/student-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";
import type { StudentDocumentsResponseDTO } from "@/application/dto/student-documents-response-dto";

export const useStudentDocuments = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<StudentDocumentsResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentDocuments",
            params: [userData?.CD_MAT]
        }
    );

    return { data: data[0], loading };
}