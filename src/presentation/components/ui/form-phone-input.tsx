import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormPhoneProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    className?: string;
}

const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return numbers.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export default function FormPhone<T extends FieldValues>({
    control,
    name,
    label,
    className = "",
    ...inputProps
}: FormPhoneProps<T>) {
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
                            type="tel"
                            value={formatPhoneNumber(field.value || '')}
                            onChange={(e) => {
                                const formatted = formatPhoneNumber(e.target.value);
                                field.onChange(formatted);
                            }}
                            className="w-full"
                            inputMode="tel"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
