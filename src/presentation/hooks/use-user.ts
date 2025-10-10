import type { UserInfoResponseDTO } from "@/application/dto/user-info-response-dto";
import { StudentService } from "@/domain/services/student-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";

export const useUser = () => {
    const { userData } = useAuth();

    const { data, loading, error } = useFetchData<UserInfoResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getStudent",
            params: [userData!.CD_MAT]
        }
    );

    return {
        data: Array.isArray(data) ? data[0] : data,
        loading,
        error
    };
}