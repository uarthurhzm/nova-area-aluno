import { useAuth } from "@/presentation/contexts/AuthContext";
import { useToast } from "@/presentation/contexts/ToastContext";
import axios, { AxiosError, HttpStatusCode, isAxiosError } from "axios";

const AxiosSetup = () => {

    const { showError } = useToast();
    const { token } = useAuth();

    const api = axios.create({
        baseURL: import.meta.env.VITE_FETCH_URL,
        timeout: 30000,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true"
        }
    });

    api.interceptors.response.use(
        response => {
            return response.data;
        },
        async (error: AxiosError) => {

            if (isAxiosError(error)) {
                const status = error.response?.status;
                const responseData = error.response?.data as { message?: string; data?: any };

                // BadRequest - 400
                // Conflict - 409
                if (status === HttpStatusCode.BadRequest || status === HttpStatusCode.Conflict) {
                    const message = responseData?.message || "Erro";
                    showError(message);
                }
            }

            return Promise.reject(error);
        }
    );

    api.interceptors.request.use(
        config => {
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    return { api };
}

export default AxiosSetup;