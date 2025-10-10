import { StudentService } from "@/domain/services/student-service";
import { useAuth } from "../contexts/AuthContext";
import { useFetchData } from "./use-fetch-data";

export const useStudentScientificMeeting = () => {
    const { userData } = useAuth();

    const { data, loading } = useFetchData<any, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getScientificMeetingCertificates",
            params: [userData?.CD_MAT],
        }
    );

    return { data, loading };
}