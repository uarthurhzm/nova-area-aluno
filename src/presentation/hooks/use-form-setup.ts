import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type Resolver, type SubmitHandler, type UseFormProps, type UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { ZodType } from "zod";


interface UseFormSetupProps<TSchema extends z.ZodType> {
    schema: TSchema
    defaultValues?: z.infer<TSchema>;
    onSubmit: (data: z.infer<TSchema>) => void | Promise<void>;
    formOptions?: Omit<UseFormProps<FieldValues>, "resolver" | "defaultValues">;
}

interface UseFormSetupReturn<T extends z.ZodType> {
    form: UseFormReturn<FieldValues>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    FormData: z.infer<T>;
}


export function useFormSetup<TSchema extends z.ZodTypeAny>({ schema, defaultValues, onSubmit, formOptions }: UseFormSetupProps<TSchema>): UseFormSetupReturn<TSchema> {

    const form = useForm<FieldValues>({
        resolver: zodResolver(schema as ZodType<unknown, FieldValues>) as Resolver<FieldValues, any, FieldValues>,
        defaultValues: defaultValues || {},
        ...formOptions
    });

    const handleSubmit = form.handleSubmit(onSubmit as SubmitHandler<FieldValues>);

    return {
        form,
        handleSubmit,
        FormData: {} as z.infer<TSchema>,
    };
}
