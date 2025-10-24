import { ROUTES } from "@/shared/constants/router";
import Flex from "../components/ui/flex";
import OptionsCard from "../components/ui/options-card";
import StandardSubpage from "../components/ui/standart-subpage";
import { TopicTitle } from "../components/ui/topic-title";

export default function AttendancePage() {
    return (
        <StandardSubpage title="Requerimento de Atendimento">
            <TopicTitle title="Ações Disponíveis" />
            <Flex>
                <OptionsCard
                    options={[
                        {
                            name: "Abrir um Requerimento",
                            image: "https://img.icons8.com/?size=100&id=50896&format=png&color=000000",
                            route: ROUTES.attendanceRequest,
                            description: "Abra um requerimento para atendimento na secretaria.",
                            gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700"
                        },
                        {
                            name: "Status dos Requerimentos",
                            image: "https://img.icons8.com/?size=100&id=101229&format=png&color=000000",
                            route: ROUTES.attendanceStatus,
                            description: "Acompanhe o status dos seus requerimentos de atendimento.",
                            gradient: "bg-gradient-to-br from-green-500 via-green-600 to-teal-700"
                        }
                    ]}
                />
            </Flex>
        </StandardSubpage>
    )
}