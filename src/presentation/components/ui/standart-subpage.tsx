import AppLayout from "./app-layout";
import ContentWrapper from "./content-wrapper";

export default function StandardSubpage({ title, children, withSpace = false }: { title?: string, children?: React.ReactNode, withSpace?: boolean }) {
    return (
        <AppLayout goBackButton={true} title={title}>
            <ContentWrapper className={`${withSpace ? "space-y-4" : ""} dark:bg-gray-800`}>
                {children}
            </ContentWrapper>
        </AppLayout>
    )
}