import { StudentService } from "@/domain/services/student-service";
import AxiosSetup from "@/infra/http/axios-setup";

export const useStudentService = () => {
    return new StudentService(AxiosSetup().api);
}