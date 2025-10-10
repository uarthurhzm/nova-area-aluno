import { cn } from "@/shared/lib/utils";

export default function TextCenter({ text, className }: { text: string, className?: string }) {
    return (
        <div className={cn(`text-center`, className)}>
            <h1 className="font-bold text-3xl">{text}</h1>
        </div>
    )
}