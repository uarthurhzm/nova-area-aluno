import { useFormSetup } from "./use-form-setup";
import { PASSWORD_RECOVERY_SCHEMA } from "../schemas/schemas";
import { useLoginService } from "./use-login-service";
import { useToast } from "../contexts/ToastContext";

export const useRecoveryPasswordForm = () => {
    const { showSuccess } = useToast();
    const loginService = useLoginService();
    const { form, handleSubmit } = useFormSetup({
        schema: PASSWORD_RECOVERY_SCHEMA,
        defaultValues: {
            cpf: "",
        },
        onSubmit: async (data) => {
            try {
                const response = await loginService.recoveryPassword(data.cpf, 'A');
                showSuccess(`Credenciais enviadas para o email ${response.email}`);
            } catch (error) {
                console.error(error);
            }
        }
    });

    return { form, handleSubmit };
}