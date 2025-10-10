import type { CpaStudentQuestionsResponseDTO } from "@/application/dto/cpa-student-questions-response-dto";
import { CpaService } from "@/domain/services/cpa-service";
import { useFetchData } from "./use-fetch-data";
import { useAuth } from "../contexts/AuthContext";

export const useCpaFormQuestions = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<CpaStudentQuestionsResponseDTO, CpaService>(
        {
            ServiceClass: CpaService,
            methodName: "getStudentQuestions",
            params: [userData?.CD_MAT]
        }
    );

    return { data, loading };
}