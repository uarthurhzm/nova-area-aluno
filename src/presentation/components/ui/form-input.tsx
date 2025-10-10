import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { HTMLInputTypeAttribute } from "react";

interface FormInputProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    type?: HTMLInputTypeAttribute;
    className?: string;
}

export default function FormInput<T extends FieldValues>({
    control,
    name,
    label,
    type = "text",
    className = "",
    ...inputProps
}: FormInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            {...inputProps}
                            type={type}
                            className="w-full"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
