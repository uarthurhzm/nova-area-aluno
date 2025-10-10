import { FormField } from "@/presentation/components/ui/form";
import type { HTMLInputTypeAttribute } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import FormInput from "./form-input";

interface FormInputNumberProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    type?: HTMLInputTypeAttribute;
    className?: string;
}

export default function FormInputNumber<T extends FieldValues>({
    control,
    name,
    label,
    type = "text",
    className = "",
    ...inputProps
}: FormInputNumberProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormInput
                    {...field}
                    {...inputProps}
                    control={control}
                    name={name}
                    label={label}
                    onChange={(e) => {
                        const value = e.currentTarget.value.replace(/\D/g, '');
                        field.onChange(value);
                    }}

                />
            )}
        />
    );
}
