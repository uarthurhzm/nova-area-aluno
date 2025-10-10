import type { LucideIcon } from "lucide-react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface GridActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "outline" | "ghost" | "link" | "default" | "destructive";
    icon: LucideIcon | React.FC;
    label: string;
    onClick: () => void;
}

export default function GridActionButton({ variant = "outline", icon: Icon, label, onClick }: GridActionButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={variant}
                    onClick={onClick}>
                    <Icon />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                {label}
            </TooltipContent>
        </Tooltip>
    )
}