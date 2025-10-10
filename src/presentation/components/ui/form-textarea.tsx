import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Textarea } from "@/presentation/components/ui/textarea";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormTextareaProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    rows?: number;
    className?: string;
}

export default function FormTextarea<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "",
    rows = 8,
    className = ""
}: FormTextareaProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            {...field}
                            placeholder={placeholder}
                            rows={rows}
                            className="w-full resize-none max-h-96"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}