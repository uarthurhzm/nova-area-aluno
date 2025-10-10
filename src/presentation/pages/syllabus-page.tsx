import AcademicAlert from "../components/ui/academic-alert";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Flex from "../components/ui/flex";
import { Skeleton } from "../components/ui/skeleton";
import StandardSubpage from "../components/ui/standart-subpage";
import { useSyllabus } from "../hooks/use-syllabus";

export default function SyllabusPage() {

    const { data, loading } = useSyllabus();

    if (loading) {
        return (
            <StandardSubpage title="Ementa">
                <div className="flex flex-col gap-4">
                    {[...Array(10)].map((_, i) => (<Skeleton key={i} className="w-full p-4 h-24" />))}
                </div>

            </StandardSubpage>
        )
    }

    return (
        <StandardSubpage title="Ementa">
            <Flex className="flex-wrap">
                {data.map((item, index) => (
                    <Card key={index} className="w-full hover:scale-[1.01] transition-all hover:shadow-lg">
                        <CardHeader>
                            <CardTitle>{item.NMDISC}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-line">{item.EMENTA ?? "SEM EMENTA"}</p>
                        </CardContent>
                    </Card>
                ))}
            </Flex>
            {/* <div className="flex flex-col gap-6">
                {data.map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 hover:shadow-md transition-all hover:scale-[1.01]">
                        <h2 className="text-lg font-semibold mb-2">{item.NMDISC}</h2>
                        <p className="whitespace-pre-line">{item.EMENTA ?? "SEM EMENTA"}</p>
                    </div>
                ))}
            </div> */}
            <AcademicAlert className="mt-4" />
        </StandardSubpage>
    )
}