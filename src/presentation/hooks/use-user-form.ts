import { USER_INFO_SCHEMA } from "../schemas/schemas";
import { useFormSetup } from "./use-form-setup";

export const useUserForm = () => {
    return useFormSetup({
        schema: USER_INFO_SCHEMA,
        defaultValues: {
            code: "",
            name: "",
            email: "",
            address: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            rg: "",
            cpf: "",
            birthdate: "",
            comercialPhone: "",
            residentialPhone: "",
            phone: "",
        },
        onSubmit: (data) => {
            console.log(data);
        }
    })
};