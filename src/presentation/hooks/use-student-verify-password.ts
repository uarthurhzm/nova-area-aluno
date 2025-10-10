import { useAuth } from "../contexts/AuthContext";
import { useStudentService } from "./use-student-service";

export const useStudentVerifyPassword = () => {
    const studentService = useStudentService();
    const { userData } = useAuth();

    const verifyPassword = async (password: string): Promise<boolean> => {
        if (!userData) return false;
        return await studentService.getStudentByPassword(userData.CD_MAT, password);
    }

    return { verifyPassword }
}