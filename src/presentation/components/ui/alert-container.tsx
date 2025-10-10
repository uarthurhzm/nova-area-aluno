import { cn } from "@/shared/lib/utils";

export default function AlertContainer({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn(`mt-4 p-4 border border-yellow-400 bg-yellow-100 text-yellow-800 rounded dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-300 ${className}`)}>
            {children}
        </div>
    )
}