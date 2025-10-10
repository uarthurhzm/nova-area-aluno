import AlertContainer from "./alert-container";
import AlertText from "./alert-text";
import StandardSubpage from "./standart-subpage";

export default function NoPermission({ title }: { title: string }) {
    return (
        <StandardSubpage title={title}>
            <AlertContainer>
                <AlertText text="Atenção: " /> Requerimento somente pela secretaria.
            </AlertContainer>
        </StandardSubpage>
    )
}