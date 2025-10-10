import { Alert, AlertDescription } from "./alert";
import AlertText from "./alert-text";

export default function AcademicAlert({ className }: { className?: string }) {
    return (
        <Alert className={className}>
            <AlertDescription>
                <AlertText text="Importante: " />Informações de caráter exclusivamente acadêmico, sem valor oficial. A impressão desta página não tem valor legal como documento. Sujeito à alteração até o final do ano letivo.
            </AlertDescription>
        </Alert>
    )
}