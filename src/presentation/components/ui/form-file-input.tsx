import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormFileInputProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    accept?: string;
    className?: string;
}

export default function FormFileInput<T extends FieldValues>({
    control,
    name,
    label,
    accept = "*",
    className = ""
}: FormFileInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { onChange, value, ...field } }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type="file"
                            accept={accept}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                onChange(file);
                            }}
                            className="w-full"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}