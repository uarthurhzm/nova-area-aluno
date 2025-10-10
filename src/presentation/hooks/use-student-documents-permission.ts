import type { StudentDocumentsPermissionResponseDTO } from "@/application/dto/student-documents-permission-response-dto";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";
import { StudentService } from "@/domain/services/student-service";

export const useStudentDocumentsPermission = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<StudentDocumentsPermissionResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudentDocumentsPermission",
            params: [userData?.CD_MAT]
        }
    );

    return { data: Array.isArray(data) ? data[0] : data, loading }
}