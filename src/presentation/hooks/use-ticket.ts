import { StudentService } from "@/domain/services/student-service";
import { useFetchData } from "./use-fetch-data";
import { useAuth } from "../contexts/AuthContext";
import type { TicketResponseDTO } from "@/application/dto/ticket-response-dto";

export const useTicket = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<TicketResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getTicket",
            params: [userData?.CD_MAT]
        }
    );

    return { data: Array.isArray(data) ? data[0] : data, loading }
}