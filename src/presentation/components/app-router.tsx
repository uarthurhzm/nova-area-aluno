import { LoginService } from "@/domain/services/login-service";
import { ROUTES } from "@/shared/constants/router";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./ui/loading";

export default function AppRouter({ isPrivate }: { isPrivate?: boolean }) {
    const { token, setToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginService = new LoginService();

    useEffect(() => {
        const checkToken = async () => {
            try {
                if (!token) {
                    await loginService.refreshToken();
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (e) {
                setToken('');
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, [token]);

    if (loading) {
        return <Loading />;
    }

    if (isPrivate && !isAuthenticated) {
        return <Navigate to={ROUTES.login} replace />;
    }
    if (!isPrivate && isAuthenticated) {
        return <Navigate to={ROUTES.home} replace />;
    }

    return <Outlet />;
}