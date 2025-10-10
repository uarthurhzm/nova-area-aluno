import type { GetNoticesResponseDTO } from "@/application/dto/get-notices-response-dto";
import { useFetchData } from "./use-fetch-data";
import { NoticeService } from "@/domain/services/notice-service";
import { useAuth } from "../contexts/AuthContext";

export const useNotices = () => {
    const { userData } = useAuth();
    const { data, loading } = useFetchData<GetNoticesResponseDTO, NoticeService>(
        {
            ServiceClass: NoticeService,
            methodName: "getNotices",
            params: [userData?.CD_MAT, userData?.CD_CSO],
        }
    );

    return { data, loading };
}