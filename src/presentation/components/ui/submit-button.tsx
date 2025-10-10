import { LoaderCircle, type LucideIcon } from "lucide-react";
import { Button } from "./button";
import type { UseFormReturn, FieldValues } from "react-hook-form";

interface SubmitButtonProps<T extends FieldValues = any> extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'form'> {
    form: UseFormReturn<T>;
    Icon?: LucideIcon;
    text: string;
    variant?: "destructive" | "link" | "active" | "default" | "outline" | "secondary" | "ghost" | null | undefined
    isToDisable?: boolean;
}


export default function SubmitButton<T extends FieldValues = any>({ form, Icon, text, variant, isToDisable, ...props }: SubmitButtonProps<T>) {
    return (
        <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={((!form.formState.isDirty || !form.formState.isValid) && isToDisable) || form.formState.isSubmitting}
            variant={variant || "default"}
            {...props}
        >
            {form.formState.isSubmitting
                ? <>
                    <LoaderCircle className="animate-spin" />
                    Enviando...
                </>
                : <>
                    {Icon && <Icon />} {text}
                </>
            }
        </Button>
    )
}