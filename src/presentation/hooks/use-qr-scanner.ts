import { useState, useEffect } from "react";
import { useToast } from "../contexts/ToastContext";

interface UseQrCodeOptions {
    requestGeolocation?: boolean;
    onScan?: (result: string, geolocation?: { latitude: number; longitude: number } | null) => void;
    onError?: (error: string) => void;
}

export const useQrCode = (options: UseQrCodeOptions = {}) => {
    const [scanning, setScanning] = useState(true);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [geolocation, setGeolocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
    const [qrResult, setQrResult] = useState<string | null>(null);
    
    const { showError } = useToast();

    // Captura a geolocalização ao montar o componente (se requisitado)
    useEffect(() => {
        if (!options.requestGeolocation) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeolocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Erro ao obter localização:", error);
                    const message = "Não foi possível obter sua localização. Verifique as permissões.";
                    showError(message);
                    options.onError?.(message);
                }
            );
        } else {
            const message = "Geolocalização não é suportada pelo seu navegador.";
            showError(message);
            options.onError?.(message);
        }
    }, [options.requestGeolocation]);

    const handleScan = (result: string) => {
        if (!scanning) return;

        setScanning(false); // Pausa o scanner para evitar múltiplas leituras
        setQrResult(result);

        // Chama callback personalizado se fornecido
        options.onScan?.(result, geolocation);
    };

    const handleError = (error: Error) => {
        console.error("Erro na câmera:", error);
        const message = "Erro ao acessar a câmera. Verifique as permissões.";
        setCameraError(message);
        showError(message);
        options.onError?.(message);
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === "environment" ? "user" : "environment");
    };

    const resetScanner = () => {
        setScanning(true);
        setCameraError(null);
        setQrResult(null);
    };

    return {
        scanning,
        cameraError,
        facingMode,
        geolocation,
        qrResult,
        handleScan,
        handleError,
        toggleCamera,
        resetScanner
    };
};