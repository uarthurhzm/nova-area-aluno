import type { StudentAttestsResponseDTO } from "@/application/dto/student-attests-response-dto";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";
import { SecretaryService } from "@/domain/services/secretary-service";

export const useStudentAttests = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<StudentAttestsResponseDTO, SecretaryService>(
        {
            ServiceClass: SecretaryService,
            methodName: "getStudentAttests",
            params: [userData?.CD_MAT]
        }
    );

    return { data, loading };
}