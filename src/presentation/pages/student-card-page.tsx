import logo_student_id from "@/shared/assets/images/logos/logo-student-id.png";
import Loading from "../components/ui/loading";
import { useStudentCard } from "../hooks/use-student-card";
import { useAuth } from "../contexts/AuthContext";

export default function StudentCardPage() {

    const { data, loading } = useStudentCard();
    const { userData } = useAuth();
    
    if (loading)
        return <Loading />

    return (
        <div>
            <div className="px-4 md:px-12 lg:px-24 py-6 w-full bg-blue-900 border border-b-8 border-b-yellow-300">
                <div className="w-full md:w-1/2 mb-4 md:mb-8">
                    <img src={logo_student_id} alt="Logo Carteirinha Estudantil" className="w-full" />
                </div>
                <div className="w-full">
                    <p className="font-semibold text-white font-montserrat text-xl md:text-2xl lg:text-4xl">CARTÃO DE IDENTIFICAÇÃO ESTUDANTIL</p>
                </div>
            </div>
            <div className="px-4 md:px-8 lg:px-12 py-6 w-full flex flex-col lg:flex-row gap-6 lg:gap-12 lg:justify-between">
                <div className="flex flex-col gap-6 md:gap-10 lg:gap-16 order-2 lg:order-1">
                    <SpanInfo title="Nome" info={data?.NM_SOCIAL || data?.NM_ALU || ""} />
                    <SpanInfo title="RG" info={data?.RG_PRO || ""} />
                    <SpanInfo title="RA" info={data?.LOGIN?.toString() || ""} />
                    <SpanInfo title="Curso" info={data?.NM_CSO || ""} />
                    <SpanInfo title="WebCod" info={data?.WEBCODE || "N/A"} />
                </div>
                <div className="flex flex-col items-center lg:absolute lg:w-[30%] lg:h-[70%] lg:right-[2%] lg:top-[20%] order-1 lg:order-2">
                    <div className="border-4 border-yellow-400 mb-6 lg:mb-24 w-48 h-48 md:w-64 md:h-64 lg:w-[568px] lg:h-[568px] aspect-square">
                        <img src={`data:image/jpeg;base64,${userData?.FOTO_ALUNO}`} alt="Foto de perfil" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-center text-2xl md:text-3xl lg:text-5xl">
                        unilago.riopreto.br
                    </span>
                </div>
            </div>
        </div>
    )
}

const SpanInfo = ({ title, info }: { title: string, info: string | number }) => {
    return (
        <span className="text-2xl md:text-3xl lg:text-5xl">
            <span className="font-bold">{title}:</span> {info}
        </span>
    )
}
