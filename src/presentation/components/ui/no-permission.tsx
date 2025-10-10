import { Alert, AlertDescription } from "./alert";
import AlertText from "./alert-text";
import StandardSubpage from "./standart-subpage";

export default function NoPermission({ title }: { title: string }) {
    return (
        <StandardSubpage title={title}>
            <Alert>
                <AlertDescription>
                    <AlertText text="Atenção: " /> Requerimento somente pela secretaria.
                </AlertDescription>
            </Alert>
        </StandardSubpage>
    )
}