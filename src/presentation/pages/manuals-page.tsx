import { MANUALS } from "@/shared/constants/manuals";
import StandardSubpage from "../components/ui/standart-subpage";

export default function ManualsPage() {
    return (
        <StandardSubpage title="Manuais & Editais (acadêmicos)">
            <ul className="list-disc list-inside">
                {MANUALS.map((manual) => (
                    <li className="mb-2" key={manual.name}>
                        <a className="text-blue-500 hover:underline" href={manual.url} target="_blank" rel="noopener noreferrer">
                            {manual.name}
                        </a>
                    </li>
                ))}
            </ul>
        </StandardSubpage>
    )
}