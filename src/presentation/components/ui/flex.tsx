export default function Flex({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col md:flex-row gap-4 ${className}`}>
            {children}
        </div>
    )
}