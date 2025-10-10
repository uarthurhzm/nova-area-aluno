import AcademicAlert from "../components/ui/academic-alert";
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
            <div className="flex flex-col gap-6">
                {data.map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                        <h2 className="text-lg font-semibold mb-2">{item.NMDISC}</h2>
                        <p className="whitespace-pre-line">{item.EMENTA ?? "SEM EMENTA"}</p>
                    </div>
                ))}
            </div>
            <AcademicAlert />
        </StandardSubpage>
    )
}