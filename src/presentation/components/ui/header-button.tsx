import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { Button } from "./button";


interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: LucideIcon,
    isActive: boolean
}

export default function HeaderButton({ Icon, children, isActive, ...props }: HeaderButtonProps) {

    return (
        <Button
            variant={isActive ? "active" : "ghost"}
            className={`w-full justify-start gap-3 h-12 hover:bg-accent hover:text-black dark:text-white`}
            {...props}
        >
            <Icon className="w-5 h-5" />
            {children}
        </Button>
    )
}