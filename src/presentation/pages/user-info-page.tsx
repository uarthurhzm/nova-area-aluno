import Column from "@/presentation/components/ui/Column";
import Flex from "@/presentation/components/ui/flex";
import { Form } from "@/presentation/components/ui/form";
import FormInput from "@/presentation/components/ui/form-input";
import FormPhone from "@/presentation/components/ui/form-phone-input";
import { useEffect } from "react";
import Loading from "../components/ui/loading";
import StandardSubpage from "../components/ui/standart-subpage";
import { useUser } from "../hooks/use-user";
import { useUserForm } from "../hooks/use-user-form";

export default function UserInfoPage() {

    const { data, loading } = useUser();
    const { form, handleSubmit } = useUserForm();

    useEffect(() => {
        if (!data) return;

        form.reset({
            code: data.CD_ALU?.toString() || "",
            name: data.NM_ALU || "",
            email: data.EMAIL || "",
            address: data.NM_RUA || "",
            number: data.NR_RUA || "",
            complement: data.COMP_RUA || "",
            neighborhood: data.NM_BAI || "",
            city: data.NM_CID || "",
            rg: data.RG_PRO || "",
            cpf: data.CPF_PRO || "",
            birthdate: data.DT_NASC || "",
            comercialPhone: data.TEL_COM || "",
            residentialPhone: data.TEL_RES || "",
            phone: data.TEL_CEL || "",
        });

    }, [data, form]);

    if (loading)
        return <Loading />

    return (
        <StandardSubpage title="Dados Cadastrais">
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        control={form.control}
                        name="code"
                        label="Código/Login"
                        placeholder="Código do aluno"
                        disabled
                        value={form.watch("code") || ""}
                    />
                    <Flex>
                        <Column size={4}>
                            <FormInput
                                control={form.control}
                                name="name"
                                label="Nome"
                                placeholder="Nome do aluno"
                                disabled
                                value={form.watch("name") || ""}
                            />
                        </Column>
                        <Column size={8}>
                            <FormInput
                                control={form.control}
                                name="email"
                                label="E-mail"
                                placeholder="E-mail do aluno"
                                disabled
                                value={form.watch("email") || ""}
                            />
                        </Column>
                    </Flex>
                    <Flex>
                        <Column size={6}>
                            <FormInput
                                control={form.control}
                                name="city"
                                label="Cidade"
                                placeholder="Cidade do aluno"
                                disabled
                                value={form.watch("city") || ""}
                            />
                        </Column>
                        <Column size={6}>
                            <FormInput
                                control={form.control}
                                name="neighborhood"
                                label="Bairro"
                                placeholder="Bairro do aluno"
                                disabled
                                value={form.watch("neighborhood") || ""}
                            />
                        </Column>
                    </Flex>
                    <Flex>
                        <Column size={8}>
                            <FormInput
                                control={form.control}
                                name="address"
                                label="Endereço"
                                placeholder="Endereço do aluno"
                                disabled
                                value={form.watch("address") || ""}
                            />
                        </Column>
                        <Column size={1}>
                            <FormInput
                                control={form.control}
                                name="number"
                                label="Número"
                                placeholder="Número do endereço"
                                disabled
                                value={form.watch("number") || ""}
                            />
                        </Column>
                        <Column size={3}>
                            <FormInput
                                control={form.control}
                                name="complement"
                                label="Complemento"
                                placeholder="Complemento do endereço"
                                disabled
                                value={form.watch("complement") || ""}
                            />
                        </Column>
                    </Flex>
                    <Flex>
                        <Column size={4}>
                            <FormInput
                                control={form.control}
                                name="rg"
                                label="RG"
                                placeholder="RG do aluno"
                                disabled
                                maxLength={10}
                                value={form.watch("rg") || ""}
                            />
                        </Column>
                        <Column size={4}>
                            <FormInput
                                control={form.control}
                                name="cpf"
                                label="CPF"
                                placeholder="CPF do aluno"
                                disabled
                                maxLength={11}
                                value={form.watch("cpf") || ""}
                            />
                        </Column>
                        <Column size={4}>
                            <FormInput
                                control={form.control}
                                type="date"
                                name="birthdate"
                                label="Data de Nascimento"
                                disabled
                                value={form.watch("birthdate") || ""}
                            />
                        </Column>
                    </Flex>
                    <Flex>
                        <Column size={4}>
                            <FormPhone
                                control={form.control}
                                name="comercialPhone"
                                label="Telefone Comercial"
                                placeholder="Telefone comercial do aluno"
                                disabled
                                value={form.watch("comercialPhone") || ""}
                            />
                        </Column>
                        <Column size={4}>
                            <FormPhone
                                control={form.control}
                                name="residentialPhone"
                                label="Telefone Residencial"
                                placeholder="Telefone residencial do aluno"
                                disabled
                                value={form.watch("residentialPhone") || ""}
                            />
                        </Column>
                        <Column size={4}>
                            <FormPhone
                                control={form.control}
                                name="phone"
                                label="Telefone Celular"
                                placeholder="Telefone celular do aluno"
                                disabled
                                value={form.watch("phone") || ""}
                            />
                        </Column>
                    </Flex>
                </form>
            </Form>
        </StandardSubpage>
    )
}