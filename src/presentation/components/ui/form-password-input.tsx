import { FormControl, FormField, FormItem, FormMessage } from "@/presentation/components/ui/form";
import type { HTMLInputTypeAttribute } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import PasswordInput from "./password-input";

interface FormPasswordProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    type?: HTMLInputTypeAttribute;
    className?: string;
}

const passwordVerify = (value: string): string => {
    return value.replace(/\D/g, '');
}

export default function FormPassword<T extends FieldValues>({
    control,
    name,
    label,
    type = "text",
    className = "",
    ...inputProps
}: FormPasswordProps<T>) {



    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormControl>
                        <PasswordInput
                            label={label}
                            {...field}
                            {...inputProps}
                            className="w-full rounded-r-none"
                            onChange={(e) => {
                                const formatted = passwordVerify(e.target.value);
                                field.onChange(formatted);
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
