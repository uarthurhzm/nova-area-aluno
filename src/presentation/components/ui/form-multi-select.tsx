import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/presentation/components/ui/popover";
import { Button } from "@/presentation/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/presentation/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/presentation/components/ui/command";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/shared/lib/utils";

interface FormMultiSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    options: any[];
    className?: string;
    valueName?: string;
    optionName?: string;
    onChange?: (value: string[]) => void;
}

export default function FormMultiSelect<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "Selecione as opções",
    options,
    className = "",
    valueName = "id",
    optionName = "name",
    onChange
}: FormMultiSelectProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const selectedValues: string[] = Array.isArray(field.value) ? field.value as string[] : [];

                const handleSelect = (optionValue: string) => {
                    const newValues = selectedValues.includes(optionValue)
                        ? selectedValues.filter((v: string) => v !== optionValue)
                        : [...selectedValues, optionValue];

                    field.onChange(newValues);
                    if (onChange) {
                        onChange(newValues);
                    }
                };

                const handleRemove = (optionValue: string, e: React.MouseEvent) => {
                    e.stopPropagation();
                    const newValues = selectedValues.filter((v: string) => v !== optionValue);
                    field.onChange(newValues);
                    if (onChange) {
                        onChange(newValues);
                    }
                };

                return (
                    <FormItem className={className}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        role="combobox"
                                        disabled={options.length === 0}
                                        className={cn(
                                            "w-full justify-between h-auto min-h-10 py-2",
                                            selectedValues.length === 0 && "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex gap-1 flex-wrap w-full">
                                            {selectedValues.length === 0 ? (
                                                <span className="text-left">
                                                    {options.length === 0 ? "NENHUMA OPÇÃO DISPONÍVEL" : placeholder}
                                                </span>
                                            ) : (
                                                <>
                                                    {selectedValues.slice(0, 3).map((value: string) => {
                                                        const option = options.find(opt => String(opt[valueName]) === value);
                                                        return (
                                                            <Badge
                                                                key={value}
                                                                variant="secondary"
                                                                className="mr-1 cursor-pointer hover:bg-secondary/80"
                                                                onClick={(e) => handleRemove(value, e)}
                                                            >
                                                                {option?.[optionName]}
                                                                <X className="ml-1 h-3 w-3" />
                                                            </Badge>
                                                        );
                                                    })}
                                                    {selectedValues.length > 3 && (
                                                        <Badge variant="secondary" className="mr-1">
                                                            +{selectedValues.length - 3} mais
                                                        </Badge>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Buscar..." />
                                        <CommandList>
                                            <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
                                            <CommandGroup>
                                                {options.map((option, index) => {
                                                    const optionValue = String(option[valueName]);
                                                    const isSelected = selectedValues.includes(optionValue);

                                                    return (
                                                        <CommandItem
                                                            key={`${optionValue}-${index}`}
                                                            value={option[optionName]}
                                                            onSelect={() => handleSelect(optionValue)}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    isSelected ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {option[optionName]}
                                                        </CommandItem>
                                                    );
                                                })}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}