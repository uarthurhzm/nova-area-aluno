import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    options: any[];
    className?: string;
    valueName?: string;
    optionName?: string;
}

export default function FormSelect<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "SELECIONE",
    options,
    className = "",
    valueName = "id",
    optionName = "name"

}: FormSelectProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select
                            name={name}
                            disabled={options.length === 0}
                            onValueChange={field.onChange}
                            value={field.value}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={options.length === 0 ? "NENHUMA OPÇÃO DISPONÍVEL" : placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option, index) => (
                                    <SelectItem key={`${option[valueName]}-${index}`} value={String(option[valueName])}>
                                        {option[optionName]}
                                    </SelectItem>
                                )
                                )}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}