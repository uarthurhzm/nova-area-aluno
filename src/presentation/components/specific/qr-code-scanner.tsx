import { Scanner } from "@yudiel/react-qr-scanner";
import { Camera, RotateCw, X } from "lucide-react";
import { Button } from "../ui/button";
import Flex from "../ui/flex";
import { Alert, AlertDescription } from "../ui/alert";
import { useQrCode } from "@/presentation/hooks/use-qr-scanner";

interface QrCodeScannerProps {
    onScan: (result: string) => void;
    onClose?: () => void;
}

export default function QrCodeScanner({ onClose }: QrCodeScannerProps) {
    const {
        scanning,
        cameraError,
        facingMode,
        geolocation,
        handleScan,
        handleError,
        toggleCamera,
        resetScanner
    } = useQrCode();

    return (
        <div className="space-y-4">
            {/* Informações e alertas */}
            <Alert>
                <Camera className="h-4 w-4" />
                <AlertDescription>
                    Aponte a câmera para o QR Code exibido pelo professor para registrar sua presença.
                </AlertDescription>
            </Alert>

            {!geolocation && (
                <Alert variant="destructive">
                    <AlertDescription>
                        Aguardando localização... Certifique-se de permitir o acesso à localização.
                    </AlertDescription>
                </Alert>
            )}

            {cameraError && (
                <Alert variant="destructive">
                    <AlertDescription>{cameraError}</AlertDescription>
                </Alert>
            )}

            {/* Scanner de QR Code */}
            {scanning && !cameraError && (
                <div className="relative w-full max-w-md mx-auto">
                    <div className="aspect-square w-full overflow-hidden rounded-lg border-4 border-primary">
                        <Scanner
                            onScan={(result) => {
                                if (result && result.length > 0) {
                                    handleScan(result[0].rawValue);
                                }
                            }}
                            onError={(error) => handleError(error as Error)}
                            constraints={{
                                facingMode: facingMode
                            }}
                            styles={{
                                container: {
                                    width: "100%",
                                    height: "100%"
                                },
                                video: {
                                    objectFit: "cover"
                                }
                            }}
                        />
                    </div>

                    {/* Botão para trocar câmera */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            onClick={toggleCamera}
                            className="rounded-full shadow-lg"
                        >
                            <RotateCw className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Mensagem quando scanner está pausado */}
            {!scanning && !cameraError && (
                <div className="text-center space-y-4 py-8">
                    <p className="text-lg font-semibold">Processando...</p>
                    <Button onClick={resetScanner} variant="outline">
                        Escanear novamente
                    </Button>
                </div>
            )}

            {/* Botões de ação */}
            <Flex className="justify-end mt-4">
                {onClose && (
                    <Button type="button" variant="outline" onClick={onClose}>
                        <X className="mr-2 h-4 w-4" />
                        Fechar
                    </Button>
                )}
            </Flex>
        </div>
    );
}
