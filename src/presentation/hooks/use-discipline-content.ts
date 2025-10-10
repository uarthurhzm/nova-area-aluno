import { StudentService } from "@/domain/services/student-service";
import { useFetchData } from "./use-fetch-data";
import type { StudentDisciplinesContentResponseDTO } from "@/application/dto/student-disciplines-content-response";
import { useAuth } from "../contexts/AuthContext";

export const useDisciplineContent = (cd_disc: number) => {
    const { userData } = useAuth();

    const { data, loading, error } = useFetchData<StudentDisciplinesContentResponseDTO[], StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getDisciplineContent",
            params: [userData?.LOGIN, cd_disc]
        }
    );
    return {
        data: data[0],
        loading,
        error
    };
}