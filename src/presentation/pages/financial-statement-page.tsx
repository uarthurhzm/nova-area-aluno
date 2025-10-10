import { Button } from "@/presentation/components/ui/button";
import { ArrowRight } from "lucide-react";
import StandardSubpage from "../components/ui/standart-subpage";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function FinancialStatementPage() {
    const { userData } = useAuth();

    const encryptDecrypt = (
        action: "encrypt" | "decrypt",
        text: string
    ): string | false => {
        const key = CryptoJS.enc.Hex.parse("6818f23eef19d38dad1d2729991f6317");
        const iv = CryptoJS.enc.Hex.parse("0ac35e3823616c810f86e526d1ed13e7".slice(0, 32));

        try {
            if (action === "encrypt") {
                const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                return encrypted.toString();
            }
            if (action === "decrypt") {
                const decrypted = CryptoJS.AES.decrypt(text, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                return decrypted.toString(CryptoJS.enc.Utf8);
            }
        } catch {
            return false;
        }
        return false;
    }

    const handleAccessClick = async () => {
        if (!userData) return;
        try {
            const response = await axios.post("https://services.unilago.edu.br/extrato-apps.php", {
                login: userData.LOGIN,
                token: encryptDecrypt("encrypt", userData.NUMPROT)
            });

            console.log(response);

        } catch (error) {
            console.error("Erro ao acessar extrato financeiro:", error);
        }

    }

    if (!userData) return

    return (
        <StandardSubpage title="Extrato Financeiro">
            {userData.LOGIN ? (
                <>
                    <p>Você será redirecionado para o extrato financeiro apos clicar no botão acessar.</p>
                    <Button
                        className="md:w-auto w-full mt-4"
                        onClick={handleAccessClick}
                    >
                        Acessar <ArrowRight />
                    </Button>
                </>
            ) : (
                <p>Indisponível no momento.</p>
            )}

        </StandardSubpage>
    )
}