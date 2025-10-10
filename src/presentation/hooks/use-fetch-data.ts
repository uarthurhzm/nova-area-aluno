import AxiosSetup from "@/infra/http/axios-setup";
import type { AxiosInstance } from "axios";
import { useEffect, useRef, useState } from "react";

interface UseFetchDataOptions<S> {
    ServiceClass: new (api: AxiosInstance) => S;
    methodName: keyof S;
    params?: any[];
}

export const useFetchData = <T, S>({ ServiceClass, methodName, params }: UseFetchDataOptions<S>) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { api } = AxiosSetup();
    const requestInProgress = useRef(false);
    const lastRequestKey = useRef<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const requestKey = JSON.stringify({
                service: ServiceClass.name,
                method: String(methodName),
                params
            });

            // Se já tem uma requisição idêntica em andamento, cancelar
            if (requestInProgress.current && lastRequestKey.current === requestKey) {
                return;
            }

            // Se já fez essa requisição e tem dados, não repetir
            if (lastRequestKey.current === requestKey && data.length > 0) {
                return;
            }

            requestInProgress.current = true;
            lastRequestKey.current = requestKey;
            try {
                const serviceInstance = new ServiceClass(api);
                const method = serviceInstance[methodName] as (...args: any[]) => Promise<T[]>;
                const response = await method.call(serviceInstance, ...params || []);
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setLoading(false);
                requestInProgress.current = false;
            }
        };

        fetchData();
    }, [...params || []]);

    return { data: data as T[], loading, error };
};