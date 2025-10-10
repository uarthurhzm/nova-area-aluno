import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { CHANGE_PASSWORD_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";
import { useStudentService } from "./use-student-service";

export const useChangePasswordForm = (callback: () => void) => {
    const studentService = useStudentService();
    const { userData } = useAuth();
    const { showSuccess } = useToast()

    const { form, handleSubmit } = useFormSetup({
        schema: CHANGE_PASSWORD_SCHEMA,
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        onSubmit: async (data) => {
            if (!userData) return;
            try {
                await studentService.patchStudentPassword(userData.CD_MAT, data.newPassword);
                showSuccess("Senha alterada com sucesso!");
                form.reset();
                callback();
            } catch (error) {
                console.error("Erro ao alterar a senha:", error);
            }
        }
    })
    return { form, handleSubmit };
}