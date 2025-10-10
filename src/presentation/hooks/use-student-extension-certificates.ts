import type { StudentExtensionCertificateResponseDTO } from "@/application/dto/student-extension-certificate-response-dto";
import { StudentService } from "@/domain/services/student-service";
import { useFetchData } from "./use-fetch-data";
import { useAuth } from "../contexts/AuthContext";

export const useStudentExtensionCertificates = () => {
    const { userData } = useAuth();

    const { data, loading } = useFetchData<StudentExtensionCertificateResponseDTO, StudentService>(
        {
            ServiceClass: StudentService,
            methodName: "getExtensionCertificates",
            params: [userData?.LOGIN],
        }
    );

    return { data, loading };
}