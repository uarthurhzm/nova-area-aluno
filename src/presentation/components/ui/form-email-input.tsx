import type { HTMLInputTypeAttribute } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import FormInput from "./form-input";

interface FormEmailInputProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
    control: Control<T>;
    name: FieldPath<T>;
    type?: HTMLInputTypeAttribute;
    className?: string;
}

export default function FormEmailInput<T extends FieldValues>({
    control,
    name,
    className = "",
    ...inputProps
}: FormEmailInputProps<T>) {
    return (
        <FormInput
            control={control}
            type="email"
            name={name}
            label="E-mail"
            placeholder="Digite seu email"
            inputMode="email"
            {...inputProps}
        />
    );
}
