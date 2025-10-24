import { Send } from "lucide-react";
import { Button } from "../components/ui/button";
import Flex from "../components/ui/flex";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import QrCodeScanner from "../components/specific/qr-code-scanner";
import { useIsIphone } from "../hooks/use-is-iphone";
import { usePostPresence } from "../hooks/use-post-presence";
import { useAuth } from "../contexts/AuthContext";
import { getCurrentLocation } from "../utils/get-current-location";
import { useState } from "react";
import StandardSubpage from "../components/ui/standart-subpage";

export default function QrCodePresencePage() {
    const isIphone = useIsIphone();
    const { post } = usePostPresence();
    const { userData } = useAuth();
    const { latitude, longitude } = getCurrentLocation();
    const [code, setCode] = useState<string>("");

    const handleSend = async (result: string) => {
        await post({
            cd_mat: userData!.CD_MAT,
            latitude,
            longitude,
            id_qrcode: result,
        });
        setCode("");
    }

    return (
        <StandardSubpage title="Confirmação de Presença via Qr Code">
            {isIphone ? (
                <div className="space-y-1">
                    <Label>Código</Label>
                    <Flex>
                        <Input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.currentTarget.value)}
                        />
                        <Button onClick={async () => { await handleSend(code) }}>
                            <Send /> Enviar
                        </Button>
                    </Flex>
                </div>
            ) : (
                <QrCodeScanner
                    onScan={
                        async (result) => {
                            if (isIphone) return;
                            await handleSend(result);
                        }}
                />
            )}
        </StandardSubpage>
    )
}