import { SecretaryService } from "@/domain/services/secretary-service";
import { useFetchData } from "./use-fetch-data";
import type { StudentDpsResponseDTO } from "@/application/dto/student-dps-response-dto";
import { useAuth } from "../contexts/AuthContext";

export const useStudentDps = () => {
    const { userData } = useAuth()
    const { data, loading } = useFetchData<StudentDpsResponseDTO, SecretaryService>(
        {
            ServiceClass: SecretaryService,
            methodName: "getStudentDependencies",
            params: [userData?.CD_MAT]
        }
    );

    return { data, loading };
}