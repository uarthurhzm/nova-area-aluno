import { LoginService } from "@/domain/services/login-service";
import { LOGIN_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";
import { setLocalStorageItem } from "./use-local-storage";
import { ROUTES } from "@/shared/constants/router";
import { useNavigate } from "react-router-dom";

export const useLoginForm = (rememberMe: boolean) => {
    const loginService = new LoginService();
    const navigate = useNavigate();

    const { form, handleSubmit } = useFormSetup({
        schema: LOGIN_SCHEMA,
        defaultValues: {
            login: "",
            password: "",
        },
        onSubmit: async (data) => {
            try {
                await loginService.login(data);
                setLocalStorageItem("rememberMe", rememberMe.toString());
                navigate(ROUTES.home);
            } catch (error) {
                console.error("Login error:", error);
            }

        }
    })

    return { form, handleSubmit };
}