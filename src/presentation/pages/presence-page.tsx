import { Form } from "@/presentation/components/ui/form";
import FormInput from "@/presentation/components/ui/form-input";
import FormSelect from "@/presentation/components/ui/form-select";
import SubmitButton from "@/presentation/components/ui/submit-button";
import { ArrowLeft, Check, MapPin, QrCode, Send, type LucideIcon } from "lucide-react";
import { useState } from "react";
import QrCodeScanner from "../components/specific/qr-code-scanner";
import { Button } from "../components/ui/button";
import Flex from "../components/ui/flex";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import TextCenter from "../components/ui/text-center";
import { useCampus } from "../hooks/use-campus";
import { useIsIphone } from "../hooks/use-is-iphone";
import { usePresenceForm } from "../hooks/use-presence-form";
import { useStudentDisciplines } from "../hooks/use-student-disciplines";
import { usePostPresence } from "../hooks/use-post-presence";
import { useAuth } from "../contexts/AuthContext";
import { getCurrentLocation } from "../utils/get-current-location";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants/router";

export default function PresencePage() {
    const [showPresenceForm, setShowPresenceForm] = useState(false);
    const [showQrCodeScanner, setShowQrCodeScanner] = useState(false);

    const handleBack = () => {
        setShowPresenceForm(false);
        setShowQrCodeScanner(false);
    };

    return (
        <StandardSubpage title="Marcar Presença">
            {!showPresenceForm && !showQrCodeScanner && <SelectSection setShowPresenceForm={setShowPresenceForm} setShowQrCodeScanner={setShowQrCodeScanner} />}
            {showPresenceForm && <PresenceFormSection onBack={handleBack} />}
            {showQrCodeScanner && <QrCodePresenceSection onClose={handleBack} />}
        </StandardSubpage >
    )
}

type PresenceOptionsProps = {
    label: string;
    variant: "primary" | "secondary";
    Icon: LucideIcon;
    onClick: () => void;
};

const SelectSection = ({ setShowPresenceForm, setShowQrCodeScanner }: { setShowPresenceForm: (value: boolean) => void; setShowQrCodeScanner: (value: boolean) => void; }) => {
    const navigate = useNavigate();
    return (
        <>
            <TextCenter text="Selecione um" />
            <Flex className="md:justify-around items-center mt-8 mb-8">
                <PresenceOptions
                    label="Via Local"
                    variant="primary"
                    Icon={MapPin}
                    onClick={() => navigate(ROUTES.locationPresence)}
                />
                <span className="font-bold text-lg">ou</span>
                <PresenceOptions
                    label="Via QR Code"
                    variant="secondary"
                    Icon={QrCode}
                    onClick={() => navigate(ROUTES.qrCodePresence)}
                />
            </Flex>
        </>
    )
}

const PresenceOptions = ({ label, variant, Icon, onClick }: PresenceOptionsProps) => {
    const colorClasses = {
        primary: "bg-blue-600 hover:bg-blue-700",
        secondary: "bg-gray-600 hover:bg-gray-700"
    };

    return (
        <div className="w-full md:w-1/2 flex justify-center">
            <button
                className={`cursor-pointer w-full md:w-1/3 p-4 text-white rounded-lg transition-colors flex flex-col items-center gap-2 ${colorClasses[variant]}`}
                onClick={onClick}
            >
                <Icon size={128} />
                <span className="font-bold text-lg">
                    {label}
                </span>
            </button>
        </div>
    );
};

const PresenceFormSection = ({ onBack }: { onBack: () => void }) => {
    const [confirmType, setConfirmType] = useState<"in" | "out">("in");
    const { data: campus, loading: loadingCampus } = useCampus();
    const { data: disciplines, loading: loadingDisciplines } = useStudentDisciplines();
    const { form, handleSubmit } = usePresenceForm(confirmType, disciplines);


    if (loadingDisciplines || loadingCampus) {
        return <div className="space-y-4">
            {[...Array(3)].map((_, i) => (<Skeleton key={i} className="h-10 w-full rounded" />))}
            <Flex className="justify-end mt-4">
                {[...Array(2)].map((_, i) => (<Skeleton key={i} className="h-10 w-32 rounded" />))}
            </Flex>
        </div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormSelect
                    control={form.control}
                    name="disciplineId"
                    label="Disciplina"
                    valueName="ID_DISC"
                    optionName="NM_DISC"
                    options={disciplines}
                />
                <FormSelect
                    control={form.control}
                    name="unitId"
                    label="Unidade"
                    valueName="ID"
                    optionName="NM_CAMPUS"
                    options={campus}
                />
                <FormInput
                    control={form.control}
                    name="date"
                    label="Referente ao dia"
                    type="date"
                    disabled={true}
                    value={new Date().toISOString().split('T')[0]}

                />
                <Flex className="justify-end mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack} className="mr-2">
                        <ArrowLeft /> Voltar
                    </Button>
                    <SubmitButton
                        Icon={Check}
                        form={form}
                        text="Confirmar entrada"
                        onClick={() => setConfirmType("in")}
                    />
                    <SubmitButton
                        variant={"destructive"}
                        Icon={Check}
                        form={form}
                        text="Confirmar saída"
                        onClick={() => setConfirmType("out")}
                    />
                </Flex>
            </form>
        </Form>
    )
}

const QrCodePresenceSection = ({ onClose }: { onClose: () => void }) => {
    const isIphone = useIsIphone();
    const { post } = usePostPresence();
    const { userData } = useAuth();
    const { latitude, longitude } = getCurrentLocation();
    const [code, setCode] = useState("");

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
        <div>
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
                    onClose={onClose}
                    onScan={
                        async (result) => {
                            if (isIphone) return;
                            await handleSend(result);
                        }}
                />
            )}
        </div>
    )
}