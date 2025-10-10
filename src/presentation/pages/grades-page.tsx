import type { StudentAbsencesResponseDTO } from "@/application/dto/student-absences-response-dto";
import type { StudentDocumentsResponseDTO } from "@/application/dto/student-documents-response-dto";
import type { StudentGradesResponseDTO } from "@/application/dto/student-grades-response-dto";
import { columns as ABSENCE_COLUMNS } from "@/presentation/components/specific/absences/columns";
import { columns as GRADES_COLUMNS } from "@/presentation/components/specific/grades/columns";
import AlertText from "@/presentation/components/ui/alert-text";
import { DataTable } from "@/presentation/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs";
import { MEDICINE } from "@/shared/constants/medicine";
import { Check, TriangleAlert } from "lucide-react";
import AcademicAlert from "../components/ui/academic-alert";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import { TopicTitle } from "../components/ui/topic-title";
import { useAuth } from "../contexts/AuthContext";
import { useCourseDuration } from "../hooks/use-course-duration";
import { useStudentAbsences } from "../hooks/use-student-absences";
import { useStudentDocuments } from "../hooks/use-student-documents";
import { useStudentGrades } from "../hooks/use-student-grades";

export default function GradesPage() {

    const { userData } = useAuth();
    const { data: grades, loading: loadingGrades } = useStudentGrades();
    const { data: documents, loading: loadingDocuments } = useStudentDocuments();
    const { data: absences, loading: loadingAbsences } = useStudentAbsences();

    //NOTE - Página Carregando
    if (!userData || loadingGrades || loadingDocuments || loadingAbsences) {
        return <StandardSubpage title={"Boletim / Faltas"}><PageSkeleton /></StandardSubpage>
    }

    //NOTE - Aluno Sem contrato - Página
    if (userData.CONTRATO == 0 && userData.TIPO != "1" && userData.TIPO_ALUNO == 1) {
        return (
            <StandardSubpage title={"Boletim / Faltas"}>
                {/* <AlertContainer>
                    <AlertText text="Prezado(a) aluno(a)" /> <br />
                    <p>Não identificamos a entrega do seu requerimento de matrícula e contrato na secretaria da instituição.</p><br />
                    <p>Lembramos que a entrega pode ser feita via correios ou diretamente na secretaria da instituição.</p><br />
                    <p>Em caso de dúvidas, envie um e-mail para <strong>matriculas@unilago.edu.br</strong></p><br />

                    <strong>Unilago</strong>
                </AlertContainer> */}
            </StandardSubpage>
        )
    }

    //NOTE - Página Normal
    return (
        <StandardSubpage title="Boletim / Faltas">
            <Tabs defaultValue="grades">
                <TabsList>
                    <TabsTrigger value="grades">Notas</TabsTrigger>
                    <TabsTrigger value="absences">Faltas</TabsTrigger>
                </TabsList>
                <TabsContent value="grades">
                    <GradesSection grades={grades} documents={documents} />
                </TabsContent>
                <TabsContent value="absences">
                    <AbsencesSection absences={absences} />
                </TabsContent>
            </Tabs>
        </StandardSubpage>
    )
}

const GradesSection = ({ grades, documents }: { grades: StudentGradesResponseDTO[]; documents: StudentDocumentsResponseDTO }) => {
    const { userData } = useAuth();
    const { data, loading } = useCourseDuration(userData!.CD_CSO);

    if (loading)
        return <PageSkeleton />

    const lastPeriod = userData!.PER_GDE + 3 >= data!.DURACAO

    const isDp = (g: StudentGradesResponseDTO) => {
        const status = Number(g.CD_SITCISC);
        const statusDp = [1, 4, 11, 12, 13, 6].includes(status);
        const anoDiff = userData!.ANOVAL_MAT !== g.ANO || userData!.SEMVAL_MAT !== g.SEMESTRE;

        //se for status de DP e for de período anterior, vai pro bloco de dependências
        return statusDp && anoDiff || (g.ANO === userData!.ANOVAL_MAT && status === 6);
    };

    const dpGrades = grades.filter(g => userData?.TIPOCURSO != 2 && isDp(g));
    const mainGrades = grades.filter(g => !dpGrades.includes(g));

    return (
        <div className="space-y-8 md:space-y-4">
            <div>
                <b>M.B:</b> Média Bimestral; <b>M.F:</b> Média Final; <b>1º B, 2º B, 3º B, 4º B:</b> Notas Bimestrais
                <DataTable columns={userData?.CD_CSO == 164 ? GRADES_COLUMNS : GRADES_COLUMNS.slice(0, -1)} data={mainGrades} />
            </div>
            {dpGrades.length > 0 && (
                <div>
                    <AlertText text="Dependências / Adaptações / A cursar" />
                    <DataTable
                        columns={[
                            {
                                accessorKey: "NM_DISC",
                                header: "Disciplina",
                                cell: ({ row }) => {
                                    const g = row.original;
                                    return `${g.ID_DISC} - ${g.NM_DISC} (${g.CD_DISC})`;
                                }
                            }
                        ]}
                        data={dpGrades}
                    />
                </div>
            )}
            {lastPeriod && (
                <div>
                    <TopicTitle title="Carga Horária Cumprida" />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {userData?.CD_CSO !== MEDICINE && <TableHead>Estágio</TableHead>}
                                <TableHead>Atividades Complementares</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {userData?.CD_CSO !== MEDICINE && <WorkloadInformation context="intern" documents={documents} />}
                                </TableCell>
                                <TableCell>
                                    <WorkloadInformation context="complementary" documents={documents} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            )}

            <div>
                <AcademicAlert />

                {userData?.CD_CSO != MEDICINE && userData?.SIT_ALUNO != 7 && (
                    <Alert className="mt-8">
                        <AlertDescription>
                            <b>Prezado(a) aluno(a)</b> <br /> <br />

                            <p>Para cursar disciplinas de adaptação ou dependência, você deverá solicitar através requerimento impresso na secretaria da instituição e, após o deferimento e recolhimento das devidas taxas(caso houver), a mesma será disponilizada para cursar.
                                O deferimento do requerimento também dependerá da oferta da(s) disciplina(s) no respectivo ano/semestre de matrícula e respeitará o limite máximo de até 03(três) disciplinas por semestre.
                                Para ser possível emissão do requerimento, a rematrícula deverá estar devidamente efetivada e o contrato assinado;</p><br />

                            <p> O prazo para solicitar o requerimento será até 31/01/2025; </p><br />
                            <p>Atenciosamente, </p><br />

                            <b>Secretaria</b> <br />
                            <b>Unilago - Nada Supera o Conhecimento</b>
                        </AlertDescription>

                    </Alert>
                )}

            </div>
        </div>
    )
}

const WorkloadInformation = ({
    context,
    documents,
}: {
    context: "intern" | "complementary";
    documents: StudentDocumentsResponseDTO;
}) => {
    const fields: (keyof StudentDocumentsResponseDTO)[] =
        context === "intern"
            ? ["CH_ALN_ESTAGIO", "CH_GRD_ESTAGIO"]
            : ["CH_ALN_ATIV", "CH_GRD_ATIVIDADES"];

    return (
        <TableCell>
            <div className="flex items-center gap-2">

                {documents[fields[0]] || 0}h / {documents[fields[1]] || 0}h
                <Tooltip>
                    <TooltipTrigger>
                        {documents[fields[0]] < documents[fields[1]] ? (
                            <TriangleAlert className="text-red-600" />
                        ) : (
                            <Check className="text-green-600" />
                        )}
                    </TooltipTrigger>
                    <TooltipContent>
                        {documents[fields[0]] < documents[fields[1]]
                            ? "Você ainda não atingiu a Carga Horária Total"
                            : "Você atingiu a Carga Horária Total"}
                    </TooltipContent>
                </Tooltip>
            </div>
        </TableCell>
    );
};


const AbsencesSection = ({ absences }: { absences: StudentAbsencesResponseDTO[] }) => {

    return (
        <div className="space-y-4">
            <DataTable columns={ABSENCE_COLUMNS} data={absences} />
            <AcademicAlert />
        </div>
    )
}

const PageSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (<Skeleton key={i} className="h-64 w-full rounded" />))}
        </div>
    )
}