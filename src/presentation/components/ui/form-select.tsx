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
    onChange?: (value: string) => void;
}

export default function FormSelect<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "SELECIONE",
    options,
    className = "",
    valueName = "id",
    optionName = "name",
    onChange

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
                            disabled={options.length === 0}
                            onValueChange={(event) => {
                                field.onChange(event);
                                if (onChange) {
                                    onChange(event);
                                }
                            }}
                            value={field.value?.toString()}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={options.length === 0 ? "NENHUMA OPÇÃO DISPONÍVEL" : placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option, index) => (
                                    <SelectItem key={`${option[valueName]}-${index}`} value={String(option[valueName])}>
                                        {option[optionName]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}