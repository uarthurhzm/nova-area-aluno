import { ROUTES } from "@/shared/constants/router";
import { MapPin, QrCode } from "lucide-react";
import Flex from "../components/ui/flex";
import OptionsCard from "../components/ui/options-card";
import StandardSubpage from "../components/ui/standart-subpage";
import { TopicTitle } from "../components/ui/topic-title";

export default function PresencePage() {
    return (
        <StandardSubpage title="Marcar Presença">
            <TopicTitle title="Ações Disponíveis" />
            <Flex className="mt-8">
                <OptionsCard
                    options={[
                        {
                            name: "Via Local",
                            route: ROUTES.locationPresence,
                            Icon: MapPin,
                            description: "Marque sua presença utilizando a localização",
                            gradient: "bg-gradient-to-br from-green-500 via-green-600 to-green-800"
                        },
                        {
                            name: "Via QR Code",
                            route: ROUTES.qrCodePresence,
                            Icon: QrCode,
                            description: "Marque sua presença utilizando o QR Code",
                        }
                    ]}
                />
            </Flex>
        </StandardSubpage >
    )
}
